/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import Starter from 'unplugin-starter/webpack'
 *
 * default export {
 *  plugins: [Starter()],
 * }
 * ```
 */
const webpack = unplugin.webpack as typeof unplugin.webpack
export default webpack
