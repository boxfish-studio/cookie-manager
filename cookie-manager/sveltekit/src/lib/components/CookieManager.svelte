<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unsafe-argument */
	import { page } from '$app/stores'
	import { SupportedService } from '$core/enums'
	import type { Service, ServiceCookie, SKCMConfiguration } from '$core/types'
	import { initServices } from '$lib/app/services'
	import { updatePathGA } from '$core/clientSideOnly'
	import {
		showCookieDisclaimer,
		hasAllNeededNecessaryCookies,
		isServiceEnabled,
		configuredServices,
		necessaryCookies,
		submitNecessaryCookies
	} from '$lib/app/store'
	import { onMount } from 'svelte'
	import { Disclaimer } from './'
	import { initializeConfiguredServices } from '$core/services'

	export let configuration: SKCMConfiguration

	$: ({ googleAnalyticsUniversalId, googleAnalytics4Id } = configuration?.services ?? {})

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
		function onConfiguredServicesInitialized(services: Service[], cookies: ServiceCookie[]): void {
			configuredServices.set(services)
			necessaryCookies.set(cookies)
		}

		initializeConfiguredServices({
			services: configuration.services,
			onConfiguredServicesInitialized
		})

		if (hasAllNeededNecessaryCookies()) {
			initServices()
		} else {
			showCookieDisclaimer.set(true)
		}
	})

	function handleSubmitNecessaryCookies(value: 'true' | 'false'): void {
		submitNecessaryCookies(value)
		if (value === 'true') {
			initServices()
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
