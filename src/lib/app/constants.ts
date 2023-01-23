import type { DisclaimerConfiguration, Theme, CookieProvider } from './types'

export const COOKIE_EXPIRATION_DAYS = 30
export const GOOGLE_ANALYTICS_EXPIRATION_DAYS = 28
export const COOKIE_NAME_PREFIX = 'skcm-'

export const GOOGLE_COOKIE_PROVIDER: CookieProvider = {
	name: 'Google',
	url: 'https://policies.google.com/privacy'
}

export const SKCM_COOKIE_PROVIDER_NAME = 'SKCM'

export const DEFAULT_DISCLAIMER_CONFIG: DisclaimerConfiguration = {
	title: 'Cookie Preferences',
	body: 'By using this site, you agree with our use of cookies.',
	policyText: 'Read our Cookie Policy',
	policyUrl: '/privacy-policy',
	acceptButtonText: 'Accept all',
	rejectButtonText: 'Reject all'
}

export const DEFAULT_THEME_COLORS: Theme = {
	primary: '#14cabf',
	dark: '#131f37',
	medium: '#b0bfd9',
	light: '#fff'
}
