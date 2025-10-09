import { type Readable, type Writable, derived, get, writable } from 'svelte/store'
import { SupportedService } from '$core/enums'
import type { Service, ServiceCookie } from '$core/types'
import {
	applyCookieManagerNecessaryCookies,
	clearAdditionalCookies,
	checkAllRequiredCookies,
	initializeGoogleAnalytics,
	stopCoreServices
} from '$core/services'
import {
	INITIAL_ADDITIONAL_COOKIES,
	INITIAL_CONFIGURED_SERVICES,
	INITIAL_NECESSARY_COOKIES,
	INITIAL_SERVICES_INITIALIZED,
	INITIAL_SHOW_COOKIE_DISCLAIMER
} from '$core/initialStates'
import { getAdditionalCookiesFromConfiguredServices } from '$core/utils'

export const showCookieDisclaimer: Writable<boolean> = writable(INITIAL_SHOW_COOKIE_DISCLAIMER)
export const configuredServices: Writable<Service[]> = writable(INITIAL_CONFIGURED_SERVICES)
export const servicesInitialized: Writable<boolean> = writable(INITIAL_SERVICES_INITIALIZED)
export const necessaryCookies: Writable<ServiceCookie[]> = writable(INITIAL_NECESSARY_COOKIES)
export const additionalCookies: Readable<ServiceCookie[]> = derived(
	configuredServices,
	($configuredServices) => getAdditionalCookiesFromConfiguredServices($configuredServices),
	INITIAL_ADDITIONAL_COOKIES
)

export const submitNecessaryCookies = (value: 'true' | 'false'): void => {
	const _necessaryCookies = get(necessaryCookies)
	const _configuredServices = get(configuredServices)
	const _servicesInitialized = get(servicesInitialized)

	applyCookieManagerNecessaryCookies(value, _necessaryCookies)

	const updatedServices = _configuredServices.map((service) => ({
		...service,
		enabled: value === 'true'
	}))
	configuredServices.set(updatedServices)

	if (value === 'true') {
		initializeGoogleAnalytics(_servicesInitialized, updatedServices, servicesInitialized.set)
	} else {
		stopCoreServices(updatedServices)
		clearAdditionalCookies(_necessaryCookies)
		servicesInitialized.set(false)
	}

	showCookieDisclaimer.set(false)
}

export const isServiceEnabled = (serviceType: SupportedService): boolean => {
	const serviceConfig = get(configuredServices)?.find(({ type }) => type === serviceType)
	return serviceConfig?.enabled
}

export const removeAdditionalCookies = (): void => {
	clearAdditionalCookies(get(necessaryCookies))
}
