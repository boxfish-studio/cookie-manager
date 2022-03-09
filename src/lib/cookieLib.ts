import type { ServiceCookie } from './types';

export enum Provider {
    google = "Google"
}
export enum privacyUrl {
    google = 'https://policies.google.com/privacy'
}
export enum cookieType {
    google = 'HTTP'
}

export const GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: cookieType.google,
}

export const GAT_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gat',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Used by Google Analytics to throttle request rate.',
    expiry: '1 day',
    type: cookieType.google
}

export const GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gid',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '1 day',
    type: cookieType.google
}

export const GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gac_<property-id>',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: ' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
    expiry: '90 days',
    type: cookieType.google
}

export const GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: cookieType.google
}

export const GA_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga_<container-id>',
    provider: Provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Used to persist session state.',
    expiry: '2 years',
    type: cookieType.google
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