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
			title: 'This website uses cookies',
			body: 'By using this site, you agree with our use of cookies'
		},
		services: {
			googleAnalytics4Id: 'G-XXXXXXXXXX'
		},
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}

	useEffect(() => {
		updatePageGA(pathname)
	}, [pathname])

	return <CookieManager configuration={configuration} />
}
