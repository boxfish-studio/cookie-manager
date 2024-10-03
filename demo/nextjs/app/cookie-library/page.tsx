'use client'

import { CookieLibrary, SKCMConfiguration } from '@boxfish-studio/react-cookie-manager'

export default function Page() {
	const configuration: SKCMConfiguration = {
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}

	return <CookieLibrary configuration={configuration} />
}
