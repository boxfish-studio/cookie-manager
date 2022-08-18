import { COOKIE_EXPIRATION_DAYS, COOKIE_NAME_PREFIX } from './constants'
import type { ServiceCookie } from './types'

export enum Provider {
	Google = 'Google',
	IOTA = 'IOTA'
}

export enum CookieType {
	HTTP = 'HTTP'
}

const RELEVANT_LINKS = {
	[Provider.Google]: {
		privacy: 'https://policies.google.com/privacy'
	},
	[Provider.IOTA]: {
		privacy: 'https://www.iota.org/privacy-policy'
	}
}

export const SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
	name: `${COOKIE_NAME_PREFIX}-ga-universal`,
	provider: Provider.IOTA,
	providerUrl: RELEVANT_LINKS.IOTA.privacy,
	purpose:
		'Stores the user´s Google Analytics Universal cookies consent state for the current domain',
	expiry: COOKIE_EXPIRATION_DAYS + ' days',
	type: CookieType.HTTP,
	showDisclaimerIfMissing: true
}

export const SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
	name: `${COOKIE_NAME_PREFIX}-ga-4`,
	provider: Provider.IOTA,
	providerUrl: RELEVANT_LINKS.IOTA.privacy,
	purpose: 'Stores the user´s Google Analytics 4 cookies consent state for the current domain',
	expiry: COOKIE_EXPIRATION_DAYS + ' days',
	type: CookieType.HTTP,
	showDisclaimerIfMissing: true
}

export const GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
	name: '_ga',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose: 'Used to distinguish users.',
	expiry: '2 years',
	type: CookieType.HTTP
}

export const GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
	name: '_gid',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose: 'Used to distinguish users.',
	expiry: '24 hours',
	type: CookieType.HTTP
}

export const GAT_GOOGLE_ANALYTICS_COOKIE: ServiceCookie = {
	name: '_gat',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose:
		'Used to throttle request rate. If Google Analytics is deployed via Google Tag Manager, this cookie will be named _dc_gtm_<property- id>.',
	expiry: '1 minute',
	type: CookieType.HTTP
}

export const GAT_GTAG_GOOGLE_ANALYTICS_COOKIE: ServiceCookie = {
	name: '_gat_gtag_UA_<property-id>',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose:
		'Used to throttle request rate. If Google Analytics is deployed via Google Tag Manager, this cookie will be named _dc_gtm_<property- id>.',
	expiry: '1 minute',
	type: CookieType.HTTP
}

export const AMP_TOKEN_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
	name: 'AMP_TOKEN',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose:
		'Contains a token that can be used to retrieve a Client ID from AMP Client ID service. Other possible values indicate opt-out, inflight request or an error retrieving a Client ID from AMP Client ID service.',
	expiry: '30 seconds to 1 year',
	type: CookieType.HTTP
}

export const GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
	name: '_gac_<property-id>',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose:
		' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
	expiry: '90 days',
	type: CookieType.HTTP
}

export const GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
	name: '_ga',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose: 'Used to distinguish users.',
	expiry: '2 years',
	type: CookieType.HTTP
}

export const GID_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
	name: '_gid',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose: 'Used to distinguish users.',
	expiry: '24 hours',
	type: CookieType.HTTP
}

export const GA_CONTAINER_GOOGLE_ANALYTICS_COOKIE: ServiceCookie = {
	name: '_ga_<container-id>',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose: 'Used to persist session state.',
	expiry: '2 years',
	type: CookieType.HTTP
}

export const GAC_GB_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
	name: '_gac_gb_<container-id>',
	provider: Provider.Google,
	providerUrl: RELEVANT_LINKS.Google.privacy,
	purpose:
		'Contains campaign related information. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
	expiry: '90 days',
	type: CookieType.HTTP
}

export const GoogleOwnCookies = {
	GoogleAnalyticsUniversal: [
		GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
		GAT_GOOGLE_ANALYTICS_COOKIE,
		GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
		GA_CONTAINER_GOOGLE_ANALYTICS_COOKIE,
		GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
		GAT_GTAG_GOOGLE_ANALYTICS_COOKIE,
		AMP_TOKEN_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
	],
	GoogleAnalytics4: [
		GA_GOOGLE_ANALYTICS_4_COOKIE,
		GID_GOOGLE_ANALYTICS_4_COOKIE,
		GA_CONTAINER_GOOGLE_ANALYTICS_COOKIE,
		GAC_GB_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE,
		GAT_GTAG_GOOGLE_ANALYTICS_COOKIE
	]
}
