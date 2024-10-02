import type { Service, ServiceCookie } from '@core/types'
import { createContext, useContext } from 'react'
import {
	INITIAL_ADDITIONAL_COOKIES,
	INITIAL_CONFIGURED_SERVICES,
	INITIAL_NECESSARY_COOKIES,
	INITIAL_SERVICES_INITIALIZED,
	INITIAL_SHOW_COOKIE_DISCLAIMER
} from '@core/initialStates'

export interface CookieManagerContextType {
	servicesInitialized: boolean
	setServicesInitialized: (value: boolean) => void
	configuredServices: Service[]
	setConfiguredServices: (value: Service[]) => void
	necessaryCookies: ServiceCookie[]
	setNecessaryCookies: (value: ServiceCookie[]) => void
	additionalCookies: ServiceCookie[]
	setAdditionalCookies: (value: ServiceCookie[]) => void
	showCookieDisclaimer: boolean
	setShowCookieDisclaimer: (value: boolean) => void
	removeUnnecessaryCookies: () => void
}

export const CookieManagerContext = createContext<CookieManagerContextType>({
	servicesInitialized: INITIAL_SERVICES_INITIALIZED,
	setServicesInitialized: () => {},
	configuredServices: INITIAL_CONFIGURED_SERVICES,
	setConfiguredServices: () => {},
	necessaryCookies: INITIAL_NECESSARY_COOKIES,
	setNecessaryCookies: () => {},
	additionalCookies: INITIAL_ADDITIONAL_COOKIES,
	setAdditionalCookies: () => {},
	showCookieDisclaimer: INITIAL_SHOW_COOKIE_DISCLAIMER,
	setShowCookieDisclaimer: () => {},
	removeUnnecessaryCookies: () => {}
})

export function useCookieManagerContext(): CookieManagerContextType {
	const context = useContext(CookieManagerContext)
	if (context === null) {
		throw new Error('useCookieManager must be used within a CookieManagerProvider')
	}
	return context
}
