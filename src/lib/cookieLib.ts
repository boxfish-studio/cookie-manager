import type { ServiceCookie } from './types';

export enum provider {
    google = "Google"
}
export enum privacyUrl {
    google = 'https://policies.google.com/privacy'
}
export enum cookieType {
    google = 'HTTP'
}

export let _gaGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_ga',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: cookieType.google,
}

export const _gatGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gat',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Used by Google Analytics to throttle request rate.',
    expiry: '1 day',
    type: cookieType.google
}

export const _gidGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gid',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '1 day',
    type: cookieType.google
}

export const _gac_propertyGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gac_<property-id>',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: ' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
    expiry: '90 days',
    type: cookieType.google
}

export const _gaGoogleAnalytics4Cookie: ServiceCookie = {
    name: '_ga',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: cookieType.google
}

export const _ga_containerGoogleAnalytics4Cookie: ServiceCookie = {
    name: '_ga_<container-id>',
    provider: provider.google,
    providerUrl: privacyUrl.google,
    purpose: 'Used to persist session state.',
    expiry: '2 years',
    type: cookieType.google
}


export const GoogleOwnCookies = {
    GoogleAnalyticsUniversal: [
        _gaGoogleAnalyticsUniversalCookie,
        _gatGoogleAnalyticsUniversalCookie,
        _gidGoogleAnalyticsUniversalCookie,
        _gac_propertyGoogleAnalyticsUniversalCookie
    ],
    GoogleAnalytics4: [
        _gaGoogleAnalytics4Cookie,
        _ga_containerGoogleAnalytics4Cookie
    ]
}