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
	export let onAcceptCookies: () => void = () => {}
	export let onDeclineCookies: () => void = () => {}

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
		const { configuredServices: services, necessaryCookies: cookies } =
			initializeConfiguredServices(configuration.services)

		configuredServices.set(services)
		necessaryCookies.set(cookies)

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
		onAcceptCookies()
		handleSubmitNecessaryCookies('true')
	}

	function declineCookies(): void {
		onDeclineCookies()
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
