<script lang="ts">
	import { CookieManager } from '$components';
	import type { SKCMConfiguration } from '$lib/types';

	let myconfig: SKCMConfiguration = {
		title: 'Custom Title',
		body: 'Custom Body',
		servicesKeys: {
			googleAnalyticsUniversalId: 'UA-55289638-1',
			googleAnalytics4Id: 'G-MRTBG711QZ'
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

<CookieManager skcmDetails={myconfig} />

<style type="text/scss">
	main {
		background-color: green;
		height: 100vh;
	}
</style>
