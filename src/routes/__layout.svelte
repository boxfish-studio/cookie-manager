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

<CookieManager googleAnalyticsUniversalId={import.meta.env.VITE_GOOGLE_ANALYTICS_UNIVERSAL_ID}/>