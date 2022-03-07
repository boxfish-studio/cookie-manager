<script lang="ts">
	import { page } from '$app/stores';
	import { initializeServices, updatePathGA } from '$lib/services';
	import { initConfiguredServices, showCookieDisclaimer } from '$lib/store';
	import { hasAllNecessaryCookies, isServiceEnabled, submitNecessaryCookies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Disclaimer } from './';
	import { SupportedService, SKCMConfiguration } from '$lib/types';

	export let skcmDetails: SKCMConfiguration;

	// TODO: improve this
	$: if ($page?.url.pathname) {
		if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
			updatePathGA(
				skcmDetails?.servicesKeys?.googleAnalyticsUniversalId,
				$page.url.pathname
			);
		} else {
			if (isServiceEnabled(SupportedService.GoogleAnalytics4)) {
				updatePathGA(skcmDetails?.servicesKeys?.googleAnalytics4Id, $page.url.pathname);
			}
		}
	}

	onMount(() => {
		initConfiguredServices(
			skcmDetails?.servicesKeys?.googleAnalyticsUniversalId,
			skcmDetails?.servicesKeys?.googleAnalytics4Id
		);
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
	<Disclaimer {allowCookies} {declineCookies} {skcmDetails} />
{/if}
