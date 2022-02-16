<script lang="ts">
	import { page } from '$app/stores';
	import { initializeServices, updatePathGA } from '$lib/services';
	import {
		initConfiguredServices,
		showCookieDisclaimer,
		updateConfiguredServices
	} from '$lib/store';
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
		initConfiguredServices(googleAnalyticsUniversalId, googleAnalytics4Id);
		if (hasAllNecessaryCookies()) {
			updateConfiguredServices();
			initializeServices(googleAnalyticsUniversalId);
		} else {
			showCookieDisclaimer.set(true);
		}
	});

	const _submitNecessaryCookies = (value: 'true' | 'false'): void => {
		submitNecessaryCookies(value);
		if (value === 'true') {
			initializeServices(googleAnalyticsUniversalId);
		}
		showCookieDisclaimer.set(false);
	};

	const allowCookies = (): void => {
		_submitNecessaryCookies('true');
	};

	const declineCookies = (): void => {
		_submitNecessaryCookies('false');
	};
</script>

{#if $showCookieDisclaimer}
	<Disclaimer {allowCookies} {declineCookies} />
{/if}
