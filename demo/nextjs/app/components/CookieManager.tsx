'use client'

import {
	CookieManager,
	useUpdatePathGA,
	type SKCMConfiguration
} from '@boxfish-studio/react-cookie-manager'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Disclaimer(): React.JSX.Element {
	const updatePageGA = useUpdatePathGA()
	const pathname = usePathname()

	const configuration: SKCMConfiguration = {
		disclaimer: {
			title: undefined,
			body: 'By using IOTA Names site, you agree with our use of cookies. ',
			policyText: 'Read our Cookie Policy',
			policyUrl: '/cookie-policy'
		},
		services: {
			customNecessaryCookies: [
				{
					name: 'AMP_',
					purpose: 'Amplitude Analytics - necessary for basic website functionality',
					expiry: '1 year',
					type: 'http',
					showDisclaimerIfMissing: true
				}
			]
		}
	}

	return (
		<CookieManager
			configuration={configuration}
			onAcceptCookies={() => {
				setTimeout(() => {
					document.cookie = 'AMP_=true; path=/; max-age=31536000'
				}, 1000)
			}}
		/>
	)
}
