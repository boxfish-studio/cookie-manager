export enum SupportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
    CustomCookie = 'customCookies'
}

export type Service = {
    type: SupportedService,
    id?: string,
    enabled?: boolean,
    cookies?: ServiceCookie[] | CustomCookieService[],
}

export type ServiceCookie = {
	name: string
	provider: string
	providerUrl: string
	purpose: string
	expiry: string
	type: string
	cookies?: CustomCookieService[]
    showDisclaimerIfMissing?: boolean
}

export type Theme = {
    primary?: string,
    dark?: string,
    light?: string,
    medium?: string
}

export type DisclaimerConfiguration = {
    title?: string,
    body?: string,
    policyText?: string,
    policyUrl?: string,
    acceptButtonText?: string,
    rejectButtonText?: string,
}

export type ServicesConfiguration = {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
	customCookies?: ServiceCookie[]
}

export type SKCMConfiguration = {
    disclaimer?: DisclaimerConfiguration,
    services?: ServicesConfiguration,
    theme?: Theme,
}

export type CustomCookieService = {
	name: string
	expDays: number
    purpose: string
}
