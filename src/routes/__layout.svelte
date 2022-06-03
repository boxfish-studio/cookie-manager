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
					name: '1st Cookie Test',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s preferences.',
					expiry: '2 months',
					type: 'HTTP',
					showDisclaimerIfMissing: true
				},
				{
					name: 'Cookie 2',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s cookies consent state for the current domain',
					expiry: '30 days',
					type: 'HTTP',
					showDisclaimerIfMissing: true
				}
			]
		}
	}
</script>

<CookieManager {configuration} />
