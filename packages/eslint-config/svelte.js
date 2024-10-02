const { resolve } = require('node:path')
const { eslintRules, typescriptEslintRules } = require('./rules')

const svelteRules = {
	'@typescript-eslint/no-explicit-any': 'off' // OFF b/c used for callback methods in Svelte components
}

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'eslint:recommended',
		'plugin:svelte/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['only-warn', '@typescript-eslint/eslint-plugin'],
	parserOptions: {
		extraFileExtensions: ['.svelte'],
		project
	},
	env: {
		node: true,
		browser: true,
		es6: true
	},
	rules: {
		...svelteRules,
		...eslintRules,
		...typescriptEslintRules
	},
	ignorePatterns: ['node_modules', 'dist'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
}
