<script lang="ts">
	import { CookieManager } from '$components';
	import type { SKCMConfiguration } from '$lib/types';

	let configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-XXXXXXXXX',
			googleAnalytics4Id: 'G-XXXXXXX'
		},
		theme: {
			light: 'white',
			dark: 'black',
			medium: '#purple',
			primary: 'blue'
		}
	};
</script>

<svelte:head />
<main>
	<slot />
</main>

<CookieManager {configuration}/>

<style type="text/scss">
</style>
