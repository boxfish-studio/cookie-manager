<script lang="ts">
	import { CookieManager } from '$components'
	import type { SKCMConfiguration } from '$core/types'

	const configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-XXXXXXXXX',
			googleAnalytics4Id: 'G-XXXXXXX',
			adCookiesEnabled: true
		}
	}
</script>

<slot />
<CookieManager {configuration} />
