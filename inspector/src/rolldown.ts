/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Starter from 'unplugin-starter/rolldown'
 *
 * export default {
 *   plugins: [Starter()],
 * }
 * ```
 */
const rolldown = unplugin.rolldown as typeof unplugin.rolldown
export default rolldown
