<script lang="ts">
	import { CookieManager } from '$components';
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
	title="Choose your cookie preferences"
	buttonColor="#14CABF"
	policyUrl="https://iota.org/privacy-policy"
	backgroundColor="yellow"
	anchorColor = "purple"
/>

<style type="text/scss">
	main {
		background-color: green;
		height: 100vh;
	}
</style>
