<script lang="ts">
	import { page } from '$app/stores';
	import { initializeServices, updatePathGA } from '$lib/services';
	import { initConfiguredServices, showCookieDisclaimer } from '$lib/store';
	import { hasAllNecessaryCookies, isServiceEnabled, submitNecessaryCookies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Disclaimer } from './';
	import { SuportedService } from '$lib/types';

	export let googleAnalyticsUniversalId: string = undefined;
	export let googleAnalytics4Id: string = undefined;

	// TODO: improve this
	$: if ($page?.url.pathname) {
		if (isServiceEnabled(SuportedService.GoogleAnalyticsUniversal)) {
			updatePathGA(googleAnalyticsUniversalId as string, $page.url.pathname);
		} else {
			if (isServiceEnabled(SuportedService.GoogleAnalytics4)) {
				updatePathGA(googleAnalytics4Id as string, $page.url.pathname);
			}
		}
	}

	onMount(() => {
		initConfiguredServices(googleAnalyticsUniversalId, googleAnalytics4Id);
		if (hasAllNecessaryCookies()) {
			initializeServices();
		} else {
			showCookieDisclaimer.set(true);
		}
	});

	const handleSubmitNecessaryCookies = (value: 'true' | 'false'): void => {
		submitNecessaryCookies(value);
		if (value === 'true') {
			initializeServices();
		}
		showCookieDisclaimer.set(false);
	};

	const allowCookies = (): void => {
		handleSubmitNecessaryCookies('true');
	};

	const declineCookies = (): void => {
		handleSubmitNecessaryCookies('false');
	};
</script>

{#if $showCookieDisclaimer}
	<Disclaimer {allowCookies} {declineCookies} />
{/if}
