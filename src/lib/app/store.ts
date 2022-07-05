import type { Readable, Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import {
	GoogleOwnCookies,
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE,
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
} from './cookieLib'
import type { Service, ServiceCookie } from './types'
import { SupportedService } from './types'
import { getCookie } from './utils'

export const showCookieDisclaimer: Writable<boolean> = writable(false)
export const configuredServices: Writable<Service[]> = writable([])
export const servicesInitialized: Writable<boolean> = writable(false)
export const necessaryCookies: Writable<ServiceCookie[]> = writable([])
export const additionalCookies: Readable<ServiceCookie[]> = derived(
	configuredServices,
	($configuredServices) => {
		return $configuredServices.reduce((accumulator, service) => {
			const cookiesName = accumulator.map((cookie) => cookie.name)
			const serviceCookies = service.cookies.filter((cookie) => {
				return !cookiesName.includes(cookie.name)
			})
			return accumulator.concat(serviceCookies)
		}, [])
	}
)

export function initConfiguredServices(
	googleAnalyticsUniversalId?: string,
	googleAnalytics4Id?: string,
	customCookies?: ServiceCookie[]
): void {
	const _configuredServices: Service[] = []
	let _necessaryCookies: ServiceCookie[] = []
	if (googleAnalyticsUniversalId) {
		_configuredServices.push({
			type: SupportedService.GoogleAnalyticsUniversal,
			id: googleAnalyticsUniversalId,
			enabled: getCookie(SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE?.name) === 'true',
			cookies: GoogleOwnCookies.GoogleAnalyticsUniversal
		})
		_necessaryCookies.push(SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE)
	}
	if (googleAnalytics4Id) {
		_configuredServices.push({
			type: SupportedService.GoogleAnalytics4,
			id: googleAnalytics4Id,
			enabled: getCookie(SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE?.name) === 'true',
			cookies: GoogleOwnCookies.GoogleAnalytics4
		})
		_necessaryCookies.push(SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE)
	}
	if (customCookies) {
		_necessaryCookies = [..._necessaryCookies, ...customCookies]
	}
	configuredServices.set(_configuredServices)
	necessaryCookies.set(_necessaryCookies)
}
