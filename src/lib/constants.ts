import { SupportedService } from './types';
import type { ServiceCookie } from './types';

export const COOKIE_EXPIRATION_DAYS = 30;
export const COOKIE_NAME_PREFIX = 'skcm-';
export const NecessaryCookies = {
    [SupportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SupportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}

export const googlePrivacyUrl = 'https://policies.google.com/privacy';
export const googleProvider = 'Google';
export const httpType = 'HTTP';

export let _gaGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_ga',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: httpType,
}

export const _gatGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gat',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: 'Used by Google Analytics to throttle request rate.',
    expiry: '1 day',
    type: httpType
}

export const _gidGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gid',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '1 day',
    type: httpType
}

export const _gac_propertyGoogleAnalyticsUniversalCookie: ServiceCookie = {
    name: '_gac_<property-id>',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: ' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
    expiry: '90 days',
    type: httpType
}

export const _gaGoogleAnalytics4Cookie: ServiceCookie = {
    name: '_ga',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: httpType
}

export const _ga_containerGoogleAnalytics4Cookie: ServiceCookie = {
    name: '_ga_<container-id>',
    provider: googleProvider,
    providerUrl: googlePrivacyUrl,
    purpose: 'Used to persist session state.',
    expiry: '2 years',
    type: httpType
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