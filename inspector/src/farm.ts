/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import Starter from 'unplugin-starter/farm'
 *
 * export default {
 *   plugins: [Starter()],
 * }
 * ```
 */
const farm = unplugin.farm as typeof unplugin.farm
export default farm
