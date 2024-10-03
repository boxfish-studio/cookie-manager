'use client'

import { CookieLibrary } from '@boxfish-studio/react-cookie-manager'

export default function Page() {
	const configuration: React.ComponentProps<typeof CookieLibrary>['configuration'] = {
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}

	return <CookieLibrary configuration={configuration} />
}
