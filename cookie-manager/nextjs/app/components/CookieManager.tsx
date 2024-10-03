'use client'

import { CookieManager } from '@boxfish-studio/react-cookie-manager'

export function Disclaimer() {
	const configuration: React.ComponentProps<typeof CookieManager>['configuration'] = {
		disclaimer: {
			title: 'This website uses cookies',
			body: 'By using this site, you agree with our use of cookies'
		},
		services: {
			googleAnalytics4Id: 'G-XXXXXXXX'
		},
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}

	return <CookieManager configuration={configuration} />
}
