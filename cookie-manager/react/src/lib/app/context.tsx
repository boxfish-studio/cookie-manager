import type { Service, ServiceCookie } from '@core/types'
import { createContext, useContext } from 'react'

export interface CookieManagerContextType {
	servicesInitialized: boolean
	setServicesInitialized: (bool: boolean) => void
	configuredServices: Service[]
	setConfiguredServices: (services: Service[]) => void
	necessaryCookies: ServiceCookie[]
	setNecessaryCookies: (services: ServiceCookie[]) => void
	additionalCookies: ServiceCookie[]
	setAdditionalCookies: (services: ServiceCookie[]) => void
	showCookieDisclaimer: boolean
	setShowCookieDisclaimer: (services: boolean) => void
}

export const CookieManagerContext = createContext<CookieManagerContextType | null>(null)

export function useCookieManagerContext(): CookieManagerContextType {
	const context = useContext(CookieManagerContext)
	if (context === null) {
		throw new Error('useCookieManager must be used within a CookieManagerProvider')
	}
	return context
}
