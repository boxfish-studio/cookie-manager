<script lang="ts">
	import { page } from '$app/stores';
	import { initializeGoogleAnalyticsUniversal, updatePathGA } from '$lib/services';
	import {
		configuredServices,
		initConfiguredServices,
		showCookieDisclaimer,
		updateConfiguredServices
	} from '$lib/store';
	import { SuportedService } from '$lib/types';
	import { hasAllNecessaryCookies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Disclaimer } from './';

	export let googleAnalyticsUniversalId: string = undefined;
	export let googleAnalytics4Id: string = undefined;

	$: if ($page.url.pathname) {
		updatePathGA(googleAnalyticsUniversalId as string, $page.url.pathname);
	}

	onMount(() => {
		initConfiguredServices(googleAnalyticsUniversalId, googleAnalytics4Id);
		if (hasAllNecessaryCookies()) {
			updateConfiguredServices();
		} else {
			showCookieDisclaimer.set(true);
		}
	});

	const _submitNecessaryCookies = (value: 'true' | 'false'): void => {
		if (value === 'true') {
			initializeServices();
		}
		showCookieDisclaimer.set(false);
	};

	const allowCookies = (): void => {
		_submitNecessaryCookies('true');
	};

	const declineCookies = (): void => {
		_submitNecessaryCookies('false');
	};

	function initializeServices(): void {
		if (configuredServices[SuportedService.GoogleAnalyticsUniversal]?.enabled) {
			initializeGoogleAnalyticsUniversal(googleAnalyticsUniversalId);
		}
	}
</script>

{#if $showCookieDisclaimer}
	<Disclaimer {allowCookies} {declineCookies} />
{/if}
