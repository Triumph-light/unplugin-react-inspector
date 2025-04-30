# unplugin-react-inspector 

[English](./README.md) | [简体中文](./README.zh-CN.md)

## Introduction
A unplugin which provides the ability that to jump to the local IDE when you click the element of browser automatically.

## Notice
now just support vite.

## Usage

```bash
npm i -D unplugin-react-inspector
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-react-inspector/vite'

export default defineConfig({
  plugins: [Starter()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-react-inspector/rollup'

export default {
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import Starter from 'unplugin-react-inspector/rolldown'

export default {
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Starter from 'unplugin-react-inspector/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Starter from 'unplugin-react-inspector/webpack'

export default {
  /* ... */
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import Starter from 'unplugin-react-inspector/rspack'

export default {
  /* ... */
  plugins: [Starter()],
}
```

<br></details>

### Options
```ts

export interface InspectorOptions {
  /**
   * Default enable state
   * @default false
   */
  enabled?: boolean
  /**
   * Define a combo key to toggle inspector
   * @default 'control-shift' on windows, 'meta-shift' on other os
   *
   * any number of modifiers `control` `shift` `alt` `meta` followed by zero or one regular key, separated by -
   * examples: control-shift, control-o, control-alt-s  meta-x control-meta
   * Some keys have native behavior (e.g. alt-s opens history menu on firefox).
   * To avoid conflicts or accidentally typing into inputs, modifier only combinations are recommended.
   * You can also disable it by setting `false`.
   */
  toggleComboKey?: string | false
  /**
   * Target editor when open in editor
   *
   * @default process.env.LAUNCH_EDITOR ?? code (Visual Studio Code)
   */
  launchEditor?: 'appcode' | 'atom' | 'atom-beta' | 'brackets' | 'clion' | 'code' | 'code-insiders' | 'codium' | 'emacs' | 'idea' | 'notepad++' | 'pycharm' | 'phpstorm' | 'rubymine' | 'sublime' | 'vim' | 'visualstudio' | 'webstorm' | 'rider' | 'cursor' | string

  include?: FilterPattern
  exclude?: FilterPattern
}
```

### example
[Demo](https://github.com/Triumph-light/unplugin-react-inspector/tree/master/examples)

## 🔌  Configuration IDE / Editor

**Using the `launchEditor` option configuration to specify the IDE** (Please ensure that the editor's environment variables are correctly configured beforehand.)

It uses an **environment variable** named **`LAUNCH_EDITOR`** to specify an IDE application, but if you do not set this variable, it will try to open a common IDE that you have open or installed once it is certified.

For example, if you want it always open VS Code when inspection clicked, set `export LAUNCH_EDITOR=code` in your shell and you must allow vscdoe check your files.


### VS Code

- install VS Code command line tools, [see the official docs](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
  ![install-vscode-cli](./public/install-vscode-cli.png)

- set env to shell, like `.bashrc` or `.zshrc`  

  ```bash
  export LAUNCH_EDITOR=code
  ```

<br />


### VS Code with WSL (Windows)

- add the configuration in the `settings.json`

- restart the VS Code (All Windows should be closed to take effect)

```json
{
  // other config...

  "terminal.integrated.env.linux": {
    "EDITOR": "code"
  }
}
```


### WebStorm  

- just set env with an absolute path to shell, like `.bashrc` or `.zshrc` (only MacOS)  

  ```bash
  export LAUNCH_EDITOR='/Applications/WebStorm.app/Contents/MacOS/webstorm'
  ```

**OR**

- install WebStorm command line tools

- then set env to shell, like `.bashrc` or `.zshrc`  

  ```bash
  export LAUNCH_EDITOR=webstorm
  ```

<br />

### PhpStorm

- just set env with an absolute path to shell, like `.bashrc` or `.zshrc` (only MacOS)

  ```bash
  export LAUNCH_EDITOR='/Applications/PhpStorm.app/Contents/MacOS/phpstorm'
  ```

**OR**

- install PhpStorm command line tools

- then set env to shell, like `.bashrc` or `.zshrc`

  ```bash
  export LAUNCH_EDITOR=phpstorm
  ```

<br />

### Vim

Yes! you can also use vim if you want, just set env to shell

```bash
export LAUNCH_EDITOR=vim
```

<br />

## Credits
This project is inspired by [react-dev-inspector](https://github.com/zthxxx/react-dev-inspector) .

Partially implementation is inspired by [vite-plugin-vue-inspector](https://github.com/webfansplz/vite-plugin-vue-inspector/tree/main) .


## License
[MIT](./LICENSE) License © 2025-PRESENT [Triumph-light](https://github.com/Triumph-light)
