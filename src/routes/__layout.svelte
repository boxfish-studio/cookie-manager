<script lang="ts">
	import { CookieManager } from '$components';
	import type { DisclaimerDetails } from '$lib/types';

	let disclaimerDetails: DisclaimerDetails = {
		title: 'Custom Title',
		body:"Custom Body"
	};
</script>

<svelte:head />
<a href="/">homepage</a>
<a href="/developers">developers</a>
<a href="/about">about</a>
<main>
	<slot />
</main>

<CookieManager
	googleAnalyticsUniversalId={import.meta.env.VITE_GOOGLE_ANALYTICS_UNIVERSAL_ID}
	googleAnalytics4Id={import.meta.env.VITE_GOOGLE_ANALYTICS_4_ID}
	{disclaimerDetails}
/>

<style type="text/scss">
	main {
		background-color: green;
		height: 100vh;
	}
</style>
