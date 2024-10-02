import type { CookieCategory } from './enums'

export enum SupportedService {
	GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
	GoogleAnalytics4 = 'googleAnalytics4',
	CustomCookie = 'customNecessaryCookies'
}

export type Service = {
	type: SupportedService
	id?: string
	enabled?: boolean
	cookies?: ServiceCookie[]
}

export type ServiceCookie = {
	name: string
	category?: CookieCategory
	provider?: string
	providerUrl?: string
	purpose: string
	expiry: string
	type: string
	showDisclaimerIfMissing?: boolean
}

export type Theme = {
	primary?: string
	dark?: string
	light?: string
	medium?: string
}

export type DisclaimerConfiguration = {
	title?: string
	body?: string
	policyText?: string
	policyUrl?: string
	acceptButtonText?: string
	rejectButtonText?: string
}

export type ServicesConfiguration = {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
	adCookiesEnabled?: boolean
	customNecessaryCookies?: ServiceCookie[]
}

export type SKCMConfiguration = {
	disclaimer?: DisclaimerConfiguration
	services?: ServicesConfiguration
	theme?: Theme
}

export type CookieProvider = {
	name: string
	url: string
}

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dataLayer: any
	}
}
