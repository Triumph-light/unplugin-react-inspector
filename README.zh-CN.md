# unplugin-react-next-inspector

## 简介

一个 unplugin 插件，提供点击浏览器中元素即可自动跳转到本地 IDE 的能力。

## 注意事项

目前仅支持 Vite。

## 使用方法

```bash
npm i -D unplugin-react-next-inspector
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-react-next-inspector/vite'

export default defineConfig({
  plugins: [Starter()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-react-next-inspector/rollup'

export default {
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import Starter from 'unplugin-react-next-inspector/rolldown'

export default {
  plugins: [Starter()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Starter from 'unplugin-react-next-inspector/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Starter from 'unplugin-react-next-inspector/webpack'

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
import Starter from 'unplugin-react-next-inspector/rspack'

export default {
  /* ... */
  plugins: [Starter()],
}
```

<br></details>

### 配置项

```ts
export interface InspectorOptions {
  /**
   * 是否默认启用
   * @default false
   */
  enabled?: boolean

  /**
   * 定义用于切换 inspector 的组合键
   * @default windows 为 'control-shift'，其他操作系统为 'meta-shift'
   *
   * 格式：任意多个组合键 `control` `shift` `alt` `meta`，后跟 0 个或 1 个常规按键，使用 - 分隔
   * 示例：control-shift、control-o、control-alt-s、meta-x、control-meta
   * 某些按键有系统默认行为（例如 Firefox 的 alt-s 会打开历史菜单）
   * 为避免冲突或误触，建议使用仅由修饰键组成的组合键
   * 若想禁用此功能，可将其设为 `false`
   */
  toggleComboKey?: string | false

  /**
   * 打开文件时使用的目标编辑器
   *
   * @default process.env.LAUNCH_EDITOR ?? code (即 VS Code)
   */
  launchEditor?: 'appcode' | 'atom' | 'atom-beta' | 'brackets' | 'clion' | 'code' | 'code-insiders' | 'codium' | 'emacs' | 'idea' | 'notepad++' | 'pycharm' | 'phpstorm' | 'rubymine' | 'sublime' | 'vim' | 'visualstudio' | 'webstorm' | 'rider' | 'cursor' | string

  include?: FilterPattern
  exclude?: FilterPattern
}
```

### 示例

[Demo](https://github.com/Triumph-light/unplugin-react-next-inspector/tree/master/examples)

## 🔌 配置 IDE / 编辑器

**推荐使用 `launchEditor` 配置项来指定 IDE**（请确保 IDE 的环境变量已正确配置）

插件会优先读取名为 **`LAUNCH_EDITOR`** 的环境变量来指定要使用的 IDE，如果未设置此变量，它会尝试识别你当前已打开或已安装的常见 IDE，并尝试打开。

例如，如果你希望每次点击跳转都使用 VS Code 打开，可在终端配置：

```bash
export LAUNCH_EDITOR=code
```

并确保 VS Code 拥有访问文件的权限。

### VS Code

- 安装 VS Code 命令行工具，[查看官方文档](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)  
  ![install-vscode-cli](./public/install-vscode-cli.png)

- 将环境变量写入 shell 配置文件，如 `.bashrc` 或 `.zshrc`

  ```bash
  export LAUNCH_EDITOR=code
  ```

<br />

### VS Code with WSL（Windows 子系统）

- 在 `settings.json` 中添加如下配置

- 重启 VS Code（需关闭所有窗口才能生效）

```json
{
  // 其他配置...

  "terminal.integrated.env.linux": {
    "EDITOR": "code"
  }
}
```

### WebStorm

- MacOS 用户可直接设置编辑器绝对路径到 shell 配置中，例如 `.bashrc` 或 `.zshrc`

  ```bash
  export LAUNCH_EDITOR='/Applications/WebStorm.app/Contents/MacOS/webstorm'
  ```

**或**

- 安装 WebStorm 的命令行工具

- 然后设置如下：

  ```bash
  export LAUNCH_EDITOR=webstorm
  ```

<br />

### PhpStorm

- MacOS 用户设置绝对路径：

  ```bash
  export LAUNCH_EDITOR='/Applications/PhpStorm.app/Contents/MacOS/phpstorm'
  ```

**或**

- 安装 PhpStorm 命令行工具

- 然后设置环境变量：

  ```bash
  export LAUNCH_EDITOR=phpstorm
  ```

<br />

### Vim

当然！你也可以使用 Vim，只需设置如下环境变量：

```bash
export LAUNCH_EDITOR=vim
```

<br />

## 致谢

本项目灵感来自 [react-dev-inspector](https://github.com/zthxxx/react-dev-inspector)。

部分实现参考了 [vite-plugin-vue-inspector](https://github.com/webfansplz/vite-plugin-vue-inspector/tree/main)。

## 许可证

[MIT](./LICENSE) License © 2025-至今 [Triumph-light](https://github.com/Triumph-light)
