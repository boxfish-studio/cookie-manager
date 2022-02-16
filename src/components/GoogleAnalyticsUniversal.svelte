<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { loadGoogleAnalytics, updatePathGA } from '$lib/utils';

	export let googleAnalyticsId: string = '';
	export let enabled: boolean = false;

	let mounted: boolean = false;

	onMount(() => {
		mounted = true;
	});

	export function load() {
		if (googleAnalyticsId) {
			loadGoogleAnalytics(googleAnalyticsId as string);
		}
	}

	$: if ($page.url.pathname && mounted) {
		updatePathGA(googleAnalyticsId as string, $page.url.pathname);
	}

	$: if (enabled) {
		if (googleAnalyticsId) {
			loadGoogleAnalytics(googleAnalyticsId as string);
		}
	}
</script>
