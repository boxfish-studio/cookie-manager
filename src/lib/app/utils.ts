import {
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE
} from './cookieLib'
import { DEFAULT_THEME_COLORS } from '$lib/app/constants'
import { get } from 'svelte/store'
import { COOKIE_EXPIRATION_DAYS } from './constants'
import { necessaryCookies, configuredServices } from './store'
import type { SupportedService, Theme } from './types'

/*
 * General utils for managing cookies in Typescript.
 * Source: https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
 */
export function getCookie(name: string): string | undefined {
	const value = '; ' + document.cookie
	const parts = value.split('; ' + name + '=')

	if (parts?.length == 2) {
		return parts?.pop()?.split(';')?.shift() ?? undefined
	}
}
export const setCookie = (name: string, val: string, expDays: number): void => {
	const date = new Date()
	const value = val
	date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
	document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/'
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function deleteCookie(name: string) {
	const date = new Date()
	date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000)
	document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/'
}
// -----------------------------------------------------------------------------

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
	const _configuredServices = get(configuredServices)?.map((service) => {
		return {
			...service,
			enabled: value === 'true'
		}
	})
	configuredServices.set(_configuredServices)
}

export const isServiceEnabled = (serviceType: SupportedService): boolean => {
	const serviceConfig = get(configuredServices)?.find(({ type }) => type === serviceType)
	return serviceConfig?.enabled
}

export const formatStyles = (theme: Theme): string => {
	return Object.entries(theme)
		.map((colorVariable) => `--${colorVariable[0]}:${colorVariable[1]};`)
		.join(' ')
}

export const getInlineStyle = (theme: Theme = {}): string => {
	const mergedTheme = { ...DEFAULT_THEME_COLORS, ...theme }
	return formatStyles(mergedTheme)
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
