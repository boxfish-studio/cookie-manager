/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ['@repo/eslint-config/svelte.js'],
	parserOptions: {
		project: true
	}
}
