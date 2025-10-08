import type { Service, ServiceCookie } from '@core/types'
import { createContext, useContext } from 'react'

export interface CookieManagerContextType {
	servicesInitialized: boolean
	setServicesInitialized: React.Dispatch<React.SetStateAction<boolean>>
	configuredServices: Service[]
	setConfiguredServices: React.Dispatch<React.SetStateAction<Service[]>>
	necessaryCookies: ServiceCookie[]
	setNecessaryCookies: React.Dispatch<React.SetStateAction<ServiceCookie[]>>
	additionalCookies: ServiceCookie[]
	setAdditionalCookies: React.Dispatch<React.SetStateAction<ServiceCookie[]>>
	showCookieDisclaimer: boolean
	setShowCookieDisclaimer: React.Dispatch<React.SetStateAction<boolean>>
}

export const CookieManagerContext = createContext<CookieManagerContextType | null>(null)

export function useCookieManagerContext(): CookieManagerContextType {
	const context = useContext(CookieManagerContext)
	if (context === null) {
		throw new Error('useCookieManager must be used within a CookieManagerProvider')
	}
	return context
}

export function useCookieManager(): Pick<CookieManagerContextType, 'servicesInitialized'> {
	const { servicesInitialized } = useCookieManagerContext()

	return { servicesInitialized }
}
