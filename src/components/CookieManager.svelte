<script lang="ts">
	import { page } from '$app/stores';
	import { initializeServices, updatePathGA } from '$lib/services';
	import { initConfiguredServices, showCookieDisclaimer, servicesInitialized } from '$lib/store';
	import { hasAllNecessaryCookies, submitNecessaryCookies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Disclaimer } from './';

	export let googleAnalyticsUniversalId: string = undefined;
	export let googleAnalytics4Id: string = undefined;

	// TODO: improve this
	$: if ($page?.url.pathname) {
		updatePathGA(googleAnalyticsUniversalId as string, $page.url.pathname);
	}

	onMount(() => {
		let areServicesInitialized: boolean = false;
		servicesInitialized.subscribe((value) => {
			areServicesInitialized = value;
		});
		initConfiguredServices(googleAnalyticsUniversalId, googleAnalytics4Id);
		if (hasAllNecessaryCookies()) {
			if (!areServicesInitialized) {
				initializeServices();
			}
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
