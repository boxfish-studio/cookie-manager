/* eslint-env es2022 */
const { resolve } = require('node:path')
const { eslintRules, typescriptEslintRules, eslintRulesOnlyTypescript } = require('./rules')

const project = resolve(process.cwd(), 'tsconfig.json')

const env = {
	browser: true,
	es2017: true,
	node: true,
	es6: true
}

const parserOptions = {
	ecmaVersion: 'latest',
	sourceType: 'module'
}

const config = {
	extends: ['eslint:recommended', 'prettier'],
	parser: '@babel/eslint-parser',
	plugins: ['only-warn'],
	parserOptions: {
		...parserOptions,
		requireConfigFile: false,
		project
	},
	rules: {
		...eslintRules
	}
}

const tsOverrides = {
	files: ['*.ts?(x)'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import-x/recommended',
		'plugin:react/recommended'
	],

	parser: '@typescript-eslint/parser',
	parserOptions: {
		...parserOptions,
		project,
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'import', 'react'],
	rules: {
		...eslintRules,
		...eslintRulesOnlyTypescript,
		...typescriptEslintRules
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx']
		},
		'import-x/resolver': {
			typescript: true,
			node: true
		}
	}
}

/** @type {import("eslint").Linter.Config} */
module.exports = {
	env,
	settings: {
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	...config,
	ignorePatterns: ['node_modules/', 'dist/'],
	overrides: [tsOverrides]
}
