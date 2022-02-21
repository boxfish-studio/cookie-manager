<script lang="ts">
	import { page } from '$app/stores';
	import { initializeServices, updatePathGA } from '$lib/services';
	import { initConfiguredServices, showCookieDisclaimer } from '$lib/store';
	import { hasAllNecessaryCookies, isServiceEnabled, submitNecessaryCookies } from '$lib/utils';
	import { onMount } from 'svelte';
	import { Disclaimer } from './';
	import { SupportedService } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let googleAnalyticsUniversalId: string = undefined;
	export let googleAnalytics4Id: string = undefined;
	export let title: string = 'Cookie Preferences';
	export let body: string =
		'For an optimal website experience, we use cookies and similar technologies to show personalized content, offer features and collect statistics. Clicking on "Accept" allows us to process this data and share it with third parties according to our privacy policy. You can view and change the current settings at any time by visiting our cookie policy.';
	export let acceptButtonText: string = 'Accept Additional Cookies';
	export let rejectButtonText: string = 'Reject Additional Cookies';
	export let primaryColor: string = '#14CABF';
	export let buttonTextColor: string = '#FFF';
	export let policyUrl: string = undefined;

	// TODO: improve this
	$: if ($page?.url.pathname) {
		if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
			updatePathGA(googleAnalyticsUniversalId, $page.url.pathname);
		} else {
			if (isServiceEnabled(SupportedService.GoogleAnalytics4)) {
				updatePathGA(googleAnalytics4Id, $page.url.pathname);
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
	<div transition:fade>
		<Disclaimer
			{allowCookies}
			{declineCookies}
			{title}
			{body}
			{primaryColor}
			{buttonTextColor}
			{policyUrl}
			{acceptButtonText}
			{rejectButtonText}
		/>
	</div>
{/if}
