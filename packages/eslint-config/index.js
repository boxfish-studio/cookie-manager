const { resolve } = require('node:path')
const { eslintRules, typescriptEslintRules } = require('./rules')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'eslint:recommended',
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended'
	],
	plugins: ['only-warn', '@typescript-eslint/eslint-plugin'],
	env: {
		node: true,
		browser: true,
		es6: true
	},
	settings: {
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	parser: '@typescript-eslint/parser',
	rules: {
		...eslintRules,
		...typescriptEslintRules
	},
	ignorePatterns: ['node_modules/', 'dist/'],
	overrides: [
		{
			files: ['*.js?(x)', '*.ts?(x)']
		}
	]
}
