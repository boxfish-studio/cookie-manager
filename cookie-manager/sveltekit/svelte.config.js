import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

const isPackageProduction = process.env.BUILDING_PACKAGE === 'true'

const fixedAliases = {
	$components: 'src/lib/components',
	'$components/*': 'src/lib/components/*'
}

const devAlias = {
	...fixedAliases,
	$core: '../core',
	'$core/*': '../core/*'
}

const packageAlias = {
	...fixedAliases,
	$core: './src/lib/cookie-core',
	'$core/*': './src/lib/cookie-core/*'
}

const aliases = isPackageProduction ? packageAlias : devAlias

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: aliases
	}
}

export default config
