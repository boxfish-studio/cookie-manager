import type { SKCMConfiguration } from '$core/types'

export const configuration: SKCMConfiguration = {
	disclaimer: {
		title: 'Custom Title',
		body: 'Custom Body'
	},
	services: {
		googleAnalyticsUniversalId: 'UA-XXXXXXXXX',
		googleAnalytics4Id: 'G-XXXXXXX',
		adCookiesEnabled: true,
		customNecessaryCookies: [
			{
				name: '1st_Cookie_Test',
				provider: 'Boxfish',
				providerUrl: 'boxfish.studio',
				purpose: 'Stores the user´s preferences.',
				expiry: '2 months',
				type: 'HTTP',
				showDisclaimerIfMissing: true
			},
			{
				name: 'Cookie_2',
				provider: 'Boxfish',
				providerUrl: 'boxfish.studio',
				purpose: 'Stores the user´s cookies consent state for the current domain',
				expiry: '30 days',
				type: 'HTTP',
				showDisclaimerIfMissing: true
			}
		]
	},
	theme: {
		light: '#fff',
		dark: '#131f37',
		medium: '#b0bfd9',
		primary: '#14cabf'
	},
	onAcceptCookies: () => {
		document.cookie = '1st_Cookie_Test=true; path=/; max-age=' + 60 * 60 * 24 * 30 // 30 days
		document.cookie = 'Cookie_2=true; path=/; max-age=' + 60 * 60 * 24 * 30 // 30 days
	},
	onDeclineCookies: () => {
		document.cookie = '1st_Cookie_Test=false; path=/; max-age=' + 60 * 60 * 24 * 30 // 30 days
		document.cookie = 'Cookie_2=false; path=/; max-age=' + 60 * 60 * 24 * 30 // 30 days
	}
}
