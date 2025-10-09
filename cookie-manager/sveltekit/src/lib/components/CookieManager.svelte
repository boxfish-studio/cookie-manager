<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unsafe-argument */
	import { page } from '$app/stores'
	import { SupportedService } from '$core/enums'
	import type { SKCMConfiguration } from '$core/types'
	import { updatePathGA } from '$core/clientSideOnly'
	import {
		showCookieDisclaimer,
		isServiceEnabled,
		configuredServices,
		necessaryCookies,
		submitNecessaryCookies,
		servicesInitialized
	} from '$lib/app/store'
	import { onMount } from 'svelte'
	import { Disclaimer } from './'
	import {
		checkAllRequiredCookies,
		initializeConfiguredServices,
		initializeGoogleAnalytics
	} from '$core/services'
	import { get } from 'svelte/store'

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
		const { configuredServices: services, necessaryCookies: cookies } =
			initializeConfiguredServices(configuration.services)

		configuredServices.set(services)
		necessaryCookies.set(cookies)

		const hasAllRequiredCookies = checkAllRequiredCookies(cookies)
		if (hasAllRequiredCookies) {
			initializeGoogleAnalytics(get(servicesInitialized), services, servicesInitialized.set)
		} else {
			showCookieDisclaimer.set(true)
		}
	})

	function allowCookies(): void {
		configuration.onAcceptCookies?.()
		submitNecessaryCookies('true')
	}

	function declineCookies(): void {
		configuration.onDeclineCookies?.()
		submitNecessaryCookies('false')
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
