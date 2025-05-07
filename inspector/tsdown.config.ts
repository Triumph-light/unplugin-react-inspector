import { defineConfig } from 'tsdown'
import { visualizer } from "rollup-plugin-visualizer";
import type { RolldownPlugin } from 'unplugin';

export default defineConfig({
  entry: ['./src/*.ts'],
  format: ['esm', 'cjs'],
  target: 'node18.12',
  clean: true,
  dts: true,
  minify: process.env.npm_lifecycle_event === 'build' && true,
  plugins: [process.env.npm_lifecycle_event === 'build' && visualizer({
    open: true, // 构建后自动打开报告
    filename: 'stats.html', // 报告文件名
    gzipSize: true, // 显示 gzip 压缩大小
    brotliSize: true, // 显示 brotli 压缩大小
  }) as RolldownPlugin]
})
