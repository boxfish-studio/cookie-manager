import {
	INITIAL_ADDITIONAL_COOKIES,
	INITIAL_CONFIGURED_SERVICES,
	INITIAL_NECESSARY_COOKIES,
	INITIAL_SERVICES_INITIALIZED,
	INITIAL_SHOW_COOKIE_DISCLAIMER
} from '@core/initialStates'
import { removeAdditionalCookies } from '@core/services'
import { getAdditionalCookiesFromConfiguredServices } from '@core/utils'
import { CookieManagerContext } from '@lib/app/context'
import { useEffect, useState } from 'react'

export function CookieManagerProvider({ children }: React.PropsWithChildren): React.JSX.Element {
	const [servicesInitialized, setServicesInitialized] = useState(INITIAL_SERVICES_INITIALIZED)
	const [configuredServices, setConfiguredServices] = useState(INITIAL_CONFIGURED_SERVICES)
	const [necessaryCookies, setNecessaryCookies] = useState(INITIAL_NECESSARY_COOKIES)
	const [additionalCookies, setAdditionalCookies] = useState(INITIAL_ADDITIONAL_COOKIES)
	const [showCookieDisclaimer, setShowCookieDisclaimer] = useState(INITIAL_SHOW_COOKIE_DISCLAIMER)

	useEffect(() => {
		getAdditionalCookiesFromConfiguredServices(configuredServices)
	}, [configuredServices])

	function removeUnnecessaryCookies(): void {
		removeAdditionalCookies(necessaryCookies)
	}

	return (
		<CookieManagerContext.Provider
			value={{
				servicesInitialized,
				setServicesInitialized,
				configuredServices,
				setConfiguredServices,
				necessaryCookies,
				setNecessaryCookies,
				additionalCookies,
				setAdditionalCookies,
				showCookieDisclaimer,
				setShowCookieDisclaimer,
				removeUnnecessaryCookies
			}}
		>
			{children}
		</CookieManagerContext.Provider>
	)
}
