import { type Readable, type Writable, derived, get, writable } from 'svelte/store'
import { SupportedService } from '$core/enums'
import type { Service, ServiceCookie } from '$core/types'
import {
	setNecessaryCookies,
	clearAdditionalCookies,
	checkAllRequiredCookies
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

// Check user has all needed necessary cookies already set
export const hasAllNeededNecessaryCookies = (): boolean =>
	checkAllRequiredCookies(get(necessaryCookies))

export const submitNecessaryCookies = (value: 'true' | 'false'): void => {
	setNecessaryCookies(value, get(configuredServices), get(necessaryCookies), configuredServices.set)
}

export const isServiceEnabled = (serviceType: SupportedService): boolean => {
	const serviceConfig = get(configuredServices)?.find(({ type }) => type === serviceType)
	return serviceConfig?.enabled
}

export const removeAdditionalCookies = (): void => {
	clearAdditionalCookies(get(necessaryCookies))
}
