import { type Readable, type Writable, derived, get, writable } from 'svelte/store'
import {
	GoogleOwnCookies,
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE,
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
} from '$core/cookieLib'
import { CookieCategory } from '$core/enums'
import type { Service, ServiceCookie } from '$core/types'
import { SupportedService } from '$core/types'
import { deleteCookie, getCookie, setCookie } from '$core/utils'
import { COOKIE_EXPIRATION_DAYS } from '$core/constants'

export const showCookieDisclaimer: Writable<boolean> = writable(false)
export const configuredServices: Writable<Service[]> = writable([])
export const servicesInitialized: Writable<boolean> = writable(false)
export const necessaryCookies: Writable<ServiceCookie[]> = writable([])
export const additionalCookies: Readable<ServiceCookie[]> = derived(
	configuredServices,
	($configuredServices) =>
		$configuredServices.reduce((accumulator, service) => {
			const cookiesName = accumulator.map((cookie) => cookie.name)
			const serviceCookies = service.cookies.filter((cookie) => !cookiesName.includes(cookie.name))
			return accumulator.concat(serviceCookies)
		}, [])
)

export function initConfiguredServices(
	googleAnalyticsUniversalId?: string,
	googleAnalytics4Id?: string,
	customNecessaryCookies?: ServiceCookie[],
	adCookiesEnabled?: boolean
): void {
	let _configuredServices: Service[] = []
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
	if (customNecessaryCookies) {
		_necessaryCookies = [..._necessaryCookies, ...customNecessaryCookies]
	}
	if (!adCookiesEnabled) {
		const filteredCookies = _configuredServices.map((service) => ({
			...service,
			cookies: service?.cookies?.filter((cookie) => cookie?.category !== CookieCategory.Advertising)
		}))
		_configuredServices = filteredCookies
	}
	configuredServices.set(_configuredServices)
	necessaryCookies.set(_necessaryCookies)
}

// Check user has all needed necessary cookies already set
export const hasAllNeededNecessaryCookies = (): boolean => {
	const neededCookies =
		get(necessaryCookies)?.filter((cookie) => cookie?.showDisclaimerIfMissing) ?? []
	for (let i = 0; i < neededCookies?.length; i++) {
		if (!getCookie(neededCookies[i].name)?.length) {
			return false
		}
	}
	return true
}

export const submitNecessaryCookies = (value: 'true' | 'false'): void => {
	const SKCM_NECESSARY_COOKIES: string[] = [
		SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE?.name,
		SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE?.name
	]
	// set cookies
	const neededCookies =
		get(necessaryCookies)?.filter(
			(cookie) => cookie?.showDisclaimerIfMissing && SKCM_NECESSARY_COOKIES.includes(cookie?.name)
		) ?? []
	for (let i = 0; i < neededCookies?.length; i++) {
		setCookie(neededCookies[i]?.name, value, COOKIE_EXPIRATION_DAYS)
	}
	// enable services
	const _configuredServices = get(configuredServices)?.map((service) => ({
		...service,
		enabled: value === 'true'
	}))
	configuredServices.set(_configuredServices)
}

export const isServiceEnabled = (serviceType: SupportedService): boolean => {
	const serviceConfig = get(configuredServices)?.find(({ type }) => type === serviceType)
	return serviceConfig?.enabled
}

export const removeAdditionalCookies = (): void => {
	const _necessaryCookies = get(necessaryCookies).map((cookie) => cookie.name)
	document.cookie
		?.split('; ')
		?.map((cookie) => cookie.split('=')[0])
		.forEach((cookie) => {
			if (!_necessaryCookies.includes(cookie)) {
				deleteCookie(cookie)
			}
		})
}
