/** @type {import("eslint").Linter.Config} */
module.exports = {
	globals: {
		React: true
	},
	root: true,
	extends: [
		'@repo/eslint-config/index.js',
		'plugin:react/recommended',
		'plugin:@next/next/recommended'
	],
	parser: '@typescript-eslint/parser',
	settings: {
		react: {
			version: 'detect'
		}
	},
	parserOptions: {
		project: true,
		ecmaVersion: 8
	}
}
