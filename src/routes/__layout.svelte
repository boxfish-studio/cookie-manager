<script lang="ts">
	import { CookieManager } from '$components';
</script>

<svelte:head />
<a href="/">homepage</a>
<a href="/developers">developers</a>
<a href="/about">about</a>
<a href="/policy">policy</a>
<main>
	<slot />
</main>

<CookieManager googleAnalyticsUniversalId={import.meta.env.VITE_GOOGLE_ANALYTICS_UNIVERSAL_ID} googleAnalytics4Id={import.meta.env.VITE_GOOGLE_ANALYTICS_4_ID} />
