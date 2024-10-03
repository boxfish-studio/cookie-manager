import type { Service, ServiceCookie } from '@core/types'
import { createContext, useContext } from 'react'
import type { StateManager } from './interfaces'

export interface CookieManagerContextType {
	servicesInitialized: StateManager<boolean>
	configuredServices: StateManager<Service[]>
	necessaryCookies: StateManager<ServiceCookie[]>
	additionalCookies: StateManager<ServiceCookie[]>
	showCookieDisclaimer: StateManager<boolean>
}

export const CookieManagerContext = createContext<CookieManagerContextType | null>(null)

export function useCookieManagerContext(): CookieManagerContextType {
	const context = useContext(CookieManagerContext)
	if (context === null) {
		throw new Error('useCookieManager must be used within a CookieManagerProvider')
	}
	return context
}
