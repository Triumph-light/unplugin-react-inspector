import { generate } from '@babel/generator'
import { parse } from "@babel/parser";

// 由于babel/traverse是cjs，采用esm打包，无法处理
const traverse = require('@babel/traverse').default

export default function compiler(sourceCode: string, id: string): string {
  const ast = parse(sourceCode, {
    sourceType: 'module',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx',
      'decorators-legacy',
      'classProperties'
    ]
  })

  traverse(ast, {
    JSXOpeningElement: {
      enter(path) {
        console.log('visitor', path.node)
      }
    }
  })

  const { code } = generate(ast)

  return code;
}

compiler('', '')