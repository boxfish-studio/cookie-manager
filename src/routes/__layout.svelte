<script lang="ts">
	import { GoogleAnalyticsUniversal } from '$components';
</script>

<svelte:head />
<a href="/">homepage</a>
<a href="/developers">developers</a>
<a href="/about">about</a>
<main>
	<slot />
</main>
<GoogleAnalyticsUniversal googleAnalyticsId={import.meta.env.VITE_GOOGLE_ANALYTICS_UNIVESAL_ID} />