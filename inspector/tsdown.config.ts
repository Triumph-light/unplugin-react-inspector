import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts'],
  format: ['esm', 'cjs'],
  target: 'node18.12',
  clean: true,
  dts: true,
})
