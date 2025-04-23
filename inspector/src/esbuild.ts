/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import unplugin from '.'

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import Starter from 'unplugin-starter/esbuild'
 * 
 * build({ plugins: [Starter()] })
```
 */
const esbuild = unplugin.esbuild as typeof unplugin.esbuild
export default esbuild
