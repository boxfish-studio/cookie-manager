import {
	GoogleOwnCookies,
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE,
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
} from './cookieLib'
import { CookieCategory, SupportedService } from './enums'
import type { Service, ServiceCookie } from './types'
import { deleteCookie, getCookie, setCookie } from './utils'
import { loadGoogleAnalytics, removeGoogleAnalytics } from './clientSideOnly'
import { COOKIE_EXPIRATION_DAYS } from './constants'

export function initializeServices(
	servicesInitialized: boolean,
	configuredServices: Service[],
	setServicesInitialized: (bool: boolean) => void
): void {
	console.log('before initializing services')
	if (!servicesInitialized) {
		console.log('initializing services')
		const googleAnalyticsUniversalConfig = configuredServices.find(
			({ type }) => type === SupportedService.GoogleAnalyticsUniversal
		)
		const googleAnalytics4Config = configuredServices.find(
			({ type }) => type === SupportedService.GoogleAnalytics4
		)
		console.log('googleAnalyticsUniversalConfig', googleAnalyticsUniversalConfig)
		if (googleAnalyticsUniversalConfig?.enabled) {
			loadGoogleAnalytics(googleAnalyticsUniversalConfig.id, setServicesInitialized)
		} else {
			console.log('googleAnalytics4Config', googleAnalytics4Config)
			if (googleAnalytics4Config?.enabled) {
				loadGoogleAnalytics(googleAnalytics4Config.id, setServicesInitialized)
			}
		}
	}
}

interface InitConfiguredServicesArgs {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
	customNecessaryCookies?: ServiceCookie[]
	adCookiesEnabled?: boolean
	onServicesInitialized: (configuredServices: Service[], necessaryCookies: ServiceCookie[]) => void
}
export function initConfiguredServices({
	googleAnalyticsUniversalId,
	googleAnalytics4Id,
	customNecessaryCookies,
	adCookiesEnabled,
	onServicesInitialized
}: InitConfiguredServicesArgs): void {
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

	onServicesInitialized?.(_configuredServices, _necessaryCookies)
}

export const stopServices = (
	configuredServices: Service[],
	removeAdditionalCookiesCb: () => void,
	setServicesInitialized: (bool: boolean) => void
): void => {
	const googleAnalyticsUniversalConfig = configuredServices?.find(
		({ type }) => type === SupportedService.GoogleAnalyticsUniversal
	)
	const googleAnalytics4Config = configuredServices?.find(
		({ type }) => type === SupportedService.GoogleAnalytics4
	)
	removeGoogleAnalytics(googleAnalytics4Config?.id)
	removeGoogleAnalytics(googleAnalyticsUniversalConfig?.id)
	removeAdditionalCookiesCb()

	setServicesInitialized?.(false)
}

export const submitNecessaryCookies = (
	value: 'true' | 'false',
	configuredServices: Service[],
	necessaryCookies: ServiceCookie[],
	setConfiguredServices: (services: Service[]) => void
): void => {
	const SKCM_NECESSARY_COOKIES: string[] = [
		SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE?.name,
		SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE?.name
	]
	// set cookies
	const neededCookies =
		necessaryCookies?.filter(
			(cookie) => cookie?.showDisclaimerIfMissing && SKCM_NECESSARY_COOKIES.includes(cookie?.name)
		) ?? []
	for (let i = 0; i < neededCookies?.length; i++) {
		setCookie(neededCookies[i]?.name, value, COOKIE_EXPIRATION_DAYS)
	}
	// enable services
	const _configuredServices = configuredServices?.map((service) => ({
		...service,
		enabled: value === 'true'
	}))
	setConfiguredServices(_configuredServices)
}

export const removeAdditionalCookies = (necessaryCookies: ServiceCookie[]): void => {
	const _necessaryCookies = necessaryCookies.map((cookie) => cookie.name)
	document.cookie
		?.split('; ')
		?.map((cookie) => cookie.split('=')[0])
		.forEach((cookie) => {
			if (!_necessaryCookies.includes(cookie)) {
				deleteCookie(cookie)
			}
		})
}

// Check user has all needed necessary cookies already set
export const hasAllNeededNecessaryCookies = (necessaryCookies: ServiceCookie[]): boolean => {
	const neededCookies = necessaryCookies?.filter((cookie) => cookie?.showDisclaimerIfMissing) ?? []
	for (let i = 0; i < neededCookies?.length; i++) {
		if (!getCookie(neededCookies[i].name)?.length) {
			return false
		}
	}
	return true
}
