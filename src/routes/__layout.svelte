<script lang="ts">
	import { CookieManager } from '$components';
	import type { SKCMConfiguration } from '$lib/types';

	let myconfig: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-55289638-1',
			googleAnalytics4Id: 'G-MRTBG711QZ'
		},
		styles: {
			light: '#fff',
			dark: '#131f37',
			medium: '#b0bfd9',
			primary: '#14cabf'
		}
	};
</script>

<svelte:head />
<a href="/">homepage</a>
<a href="/developers">developers</a>
<a href="/about">about</a>
<a href="/policy">policy</a>
<main>
	<slot />
</main>

<CookieManager configuration={myconfig} />

<style type="text/scss">
	main {
		height: 100vh;
	}
</style>
