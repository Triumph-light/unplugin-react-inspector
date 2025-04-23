/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import Starter from 'unplugin-starter/rspack'
 *
 * default export {
 *  plugins: [Starter()],
 * }
 * ```
 */
const rspack = unplugin.rspack as typeof unplugin.rspack
export default rspack
