import { generate } from '@babel/generator'
import { parse } from "@babel/parser";
import { jsxAttribute, jsxIdentifier, stringLiteral, type JSXOpeningElement } from '@babel/types';
import { relative } from 'node:path'
import { cwd } from 'node:process';
import { NodePath } from '@babel/traverse';
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
      enter(path: NodePath<JSXOpeningElement>) {
        const node = path.node
        const relativePath = relative(cwd(), id)
        const line = node.loc?.start.line
        const column = node.loc?.end.column
        const attributes = [relativePath, line, column]

        const inspectorOption = jsxAttribute(jsxIdentifier('data-inspector-option'), stringLiteral(attributes.join('_')))
        node.attributes.unshift(inspectorOption)
      }
    }
  })

  const { code } = generate(ast)

  return code;
}

compiler('', '')