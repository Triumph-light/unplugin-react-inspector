import { createUnplugin, type UnpluginInstance } from 'unplugin'
import { createFilter } from 'unplugin-utils'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import compiler from './compiler'
import { bold, green } from 'ansis'
import { normalizeComboKeyPrint } from './utils'
import type { InspectorOptions } from './type'

function getInspectorPath() {
    const pluginPath = path.dirname(fileURLToPath(import.meta.url)).replace(/\/\//, '/')
    return pluginPath.replace(/\/dist$/, '/src/core')
}

const DEFAULT_INSPECTOR_OPTIONS: InspectorOptions = {
    enabled: false,
    toggleComboKey: process.platform === 'darwin' ? 'meta-shift' : 'control-shift',
    launchEditor: process.env.LAUNCH_EDITOR ?? 'code',
    include: [/\.[cm]?[jt]sx?$/],
    exclude: [/\/node_modules\//]
}

const UnpluginReactInspector: UnpluginInstance<InspectorOptions | undefined, false> =
    // 创建插件实例
    createUnplugin((rawOptions: InspectorOptions | undefined = DEFAULT_INSPECTOR_OPTIONS) => {
        const inspectorPath = getInspectorPath()
        const options = {
            ...DEFAULT_INSPECTOR_OPTIONS,
            ...rawOptions
        } as Required<InspectorOptions>

        if (options.launchEditor) {
            process.env.LAUNCH_EDITOR = options.launchEditor
        }

        const filter = createFilter(options.include, options.exclude)

        const name = 'unplugin-starter'
        return {
            name,
            enforce: 'pre',
            // 处理路径
            async resolveId(id) {
                if (id.startsWith('virtual:react-inspector-options')) {
                    return id
                }
                else if (id.startsWith('virtual:react-inspector-path:')) {
                    const resolved = id.replace('virtual:react-inspector-path:', `${inspectorPath}/`)
                    return resolved
                }
            },

            async load(resolveId) {
                if (resolveId.startsWith('virtual:react-inspector-options')) {
                    return `export default ${JSON.stringify({ ...options })}`
                }
                else if (resolveId.startsWith(inspectorPath)) {
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
                const isJsx = id.endsWith('.jsx') || id.endsWith('.tsx')

                if (isJsx) {
                    return compiler(code, id)
                }
                return `// unplugin-starter injected\n${code}`
            },

            vite: {
                configureServer(server) {
                    const _printUrls = server.printUrls
                    const { toggleComboKey } = options

                    toggleComboKey && (server.printUrls = () => {
                        const keys = normalizeComboKeyPrint(toggleComboKey)
                        _printUrls()
                        console.log(`  ${green('➜')}  ${bold('React Inspector')}: ${green(`Press ${green(keys)} in App to toggle the Inspector`)}\n`)
                    })
                },
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
