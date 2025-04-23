import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { resolveOptions, type Options } from './options'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

function getInspectorPath() {
    const pluginPath = path.dirname(fileURLToPath(import.meta.url)).replace(/\/\//, '/')
    console.log(`[unplugin-react-inspector] pluginPath: ${pluginPath}`)
    return pluginPath.replace(/\/dist$/, '/src/core')
}

const UnpluginReactInspector: UnpluginInstance<Options | undefined, false> =
    // 创建插件实例
    createUnplugin((rawOptions = {}) => {
        const inspectorPath = getInspectorPath()
        const options = resolveOptions(rawOptions)
        const filter = createFilter(options.include, options.exclude)

        const name = 'unplugin-starter'
        return {
            name,
            enforce: options.enforce || 'pre',

            // 处理路径
            async resolveId(id) {
                if (id.startsWith('virtual:react-inspector-path:')) {
                    const resolved = id.replace('virtual:react-inspector-path:', `${inspectorPath}/`)
                    console.log('resolved: ', resolved)
                    return resolved
                }
            },

            async load(resolveId) {
                if (resolveId.startsWith(inspectorPath)) {
                    if (fs.existsSync(resolveId)) {
                        return fs.readFileSync(resolveId, 'utf-8')
                    }
                    else {
                        console.error(`[unplugin-react-inspector] failed to find file: ${resolveId}`)
                    }
                }
            },

            transformInclude(id) {
                return filter(id)
            },

            /**
             * 处理react，实现元素与文件位置的映射
             */
            transform(code, id) {
                return `// unplugin-starter injected\n${code}`
            },

            vite: {
                transformIndexHtml(html) {
                    return {
                        html,
                        tags: [
                            {
                                tag: 'script',
                                injectTo: 'head',
                                attrs: {
                                    type: 'module',
                                    src: '/@id/virtual:react-inspector-path:load.tsx',
                                },
                            },
                        ]
                    }
                }
            }
        }
    })

export default UnpluginReactInspector
