import type { ServiceCookie } from './types';

export enum Provider {
    Google = "Google"
}
export enum PrivacyUrl {
    Google = 'https://policies.google.com/privacy'
}

export enum CookieType {
    HTTP = 'HTTP'
}

export const GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: CookieType.HTTP,
}

export const GAT_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gat',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: 'Used by Google Analytics to throttle request rate.',
    expiry: '1 day',
    type: CookieType.HTTP
}

export const GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gid',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '1 day',
    type: CookieType.HTTP
}

export const GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gac_<property-id>',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: ' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
    expiry: '90 days',
    type: CookieType.HTTP
}

export const GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: CookieType.HTTP
}

export const GA_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga_<container-id>',
    provider: Provider.Google,
    providerUrl: PrivacyUrl.Google,
    purpose: 'Used to persist session state.',
    expiry: '2 years',
    type: CookieType.HTTP
}


export const GoogleOwnCookies = {
    GoogleAnalyticsUniversal: [
        GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
        GAT_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
        GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
        GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
    ],
    GoogleAnalytics4: [
        GA_GOOGLE_ANALYTICS_4_COOKIE,
        GA_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE
    ]
}