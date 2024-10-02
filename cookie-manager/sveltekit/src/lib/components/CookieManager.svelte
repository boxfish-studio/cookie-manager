<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unsafe-argument */
	import { page } from '$app/stores'
	import { initializeServices, updatePathGA } from '$lib/app/services'
	import {
		initConfiguredServices,
		showCookieDisclaimer,
		hasAllNeededNecessaryCookies,
		isServiceEnabled,
		submitNecessaryCookies
	} from '$lib/app/store'
	import { type SKCMConfiguration, SupportedService } from '$core/types'
	import { onMount } from 'svelte'
	import { Disclaimer } from './'

	export let configuration: SKCMConfiguration

	$: ({ googleAnalyticsUniversalId, googleAnalytics4Id, customNecessaryCookies, adCookiesEnabled } =
		configuration?.services ?? {})

	// TODO: improve this
	$: if ($page?.url.pathname) {
		if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
			updatePathGA(googleAnalyticsUniversalId, $page.url.pathname)
		} else {
			if (isServiceEnabled(SupportedService.GoogleAnalytics4)) {
				updatePathGA(googleAnalytics4Id, $page.url.pathname)
			}
		}
	}

	onMount(() => {
		initConfiguredServices(
			googleAnalyticsUniversalId,
			googleAnalytics4Id,
			customNecessaryCookies,
			adCookiesEnabled
		)
		if (hasAllNeededNecessaryCookies()) {
			initializeServices()
		} else {
			showCookieDisclaimer.set(true)
		}
	})

	function handleSubmitNecessaryCookies(value: 'true' | 'false'): void {
		submitNecessaryCookies(value)
		if (value === 'true') {
			initializeServices()
		}
		showCookieDisclaimer.set(false)
	}

	function allowCookies(): void {
		handleSubmitNecessaryCookies('true')
	}

	function declineCookies(): void {
		handleSubmitNecessaryCookies('false')
	}
</script>

{#if $showCookieDisclaimer}
	<Disclaimer
		{allowCookies}
		{declineCookies}
		configuration={configuration?.disclaimer}
		theme={configuration?.theme}
	/>
{/if}
