<script lang="ts">
	import { CookieManager } from '$components'
	import type { SKCMConfiguration } from '$lib/app/types'

	let configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-XXXXXXXXX',
			googleAnalytics4Id: 'G-XXXXXXX',
			customCookies: [
				{
					name: 'Cookie Test',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s cookies consent state for the current domain',
					expiry: '30 months',
					type: 'HTTP',
					cookies: [
						{
							name: 'Cookie One',
							expDays: 30,
							purpose: 'Test'
						},
						{
							name: 'Cookie Three',
							expDays: 30,
							purpose: 'Test'
						}
					],
					showDisclaimerIfMissing: true
				},
				{
					name: 'Cookie Test 3',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s cookies consent state for the current domain',
					expiry: '30 days',
					type: 'HTTP',
					cookies: [
						{
							name: 'Cookie One',
							expDays: 30,
							purpose: 'Test'
						},
						{
							name: 'Cookie Three',
							expDays: 30,
							purpose: 'Test'
						}
					],
					showDisclaimerIfMissing: true
				},
				{
					name: 'Cookie Test Numero 2',
					provider: 'Boxfish 2',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s cookies consent state for the current domain',
					expiry: '30 days',
					type: 'HTTP',
					cookies: [
						{
							name: 'Cookie Two',
							expDays: 30,
							purpose: 'Test'
						}
					]
				}
			]
		},
		theme: {
			light: 'white',
			dark: 'black',
			medium: '#purple',
			primary: 'blue'
		}
	}
</script>

<svelte:head />
<main>
	<slot />
</main>

<CookieManager {configuration} />
