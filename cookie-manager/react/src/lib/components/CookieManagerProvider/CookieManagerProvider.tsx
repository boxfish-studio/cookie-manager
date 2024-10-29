import {
	INITIAL_ADDITIONAL_COOKIES,
	INITIAL_CONFIGURED_SERVICES,
	INITIAL_NECESSARY_COOKIES,
	INITIAL_SERVICES_INITIALIZED,
	INITIAL_SHOW_COOKIE_DISCLAIMER
} from '@core/initialStates'
import { getAdditionalCookiesFromConfiguredServices } from '@core/utils'
import { CookieManagerContext, CookieManagerContextType } from '@lib/app/context'
import { useEffect, useState } from 'react'

export function CookieManagerProvider({ children }: React.PropsWithChildren): React.JSX.Element {
	const [servicesInitialized, setServicesInitialized] = useState(INITIAL_SERVICES_INITIALIZED)
	const [configuredServices, setConfiguredServices] = useState(INITIAL_CONFIGURED_SERVICES)
	const [necessaryCookies, setNecessaryCookies] = useState(INITIAL_NECESSARY_COOKIES)
	const [additionalCookies, setAdditionalCookies] = useState(INITIAL_ADDITIONAL_COOKIES)
	const [showCookieDisclaimer, setShowCookieDisclaimer] = useState(INITIAL_SHOW_COOKIE_DISCLAIMER)

	const value: CookieManagerContextType = {
		servicesInitialized: { value: servicesInitialized, setValue: setServicesInitialized },
		configuredServices: { value: configuredServices, setValue: setConfiguredServices },
		necessaryCookies: { value: necessaryCookies, setValue: setNecessaryCookies },
		additionalCookies: { value: additionalCookies, setValue: setAdditionalCookies },
		showCookieDisclaimer: { value: showCookieDisclaimer, setValue: setShowCookieDisclaimer }
	}

	useEffect(() => {
		const _additionalCookies = getAdditionalCookiesFromConfiguredServices(configuredServices)
		setAdditionalCookies(_additionalCookies)
	}, [configuredServices])

	return <CookieManagerContext.Provider value={value}>{children}</CookieManagerContext.Provider>
}
