/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import UnpluginReactInspector from 'unplugin-UnpluginReactInspector/vite'
 *
 * export default defineConfig({
 *   plugins: [UnpluginReactInspector()],
 * })
 * ```
 */
const vite = unplugin.vite as typeof unplugin.vite
export default vite
