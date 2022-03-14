import { COOKIE_EXPIRATION_DAYS, COOKIE_NAME_PREFIX } from './constants';
import type { ServiceCookie } from './types';
import { SupportedService } from './types';

export enum Provider {
    Google = "Google",
    Iota = "Iota"
}

export enum CookieType {
    HTTP = 'HTTP'
}

const RELEVANT_LINKS = {
    [Provider.Google]: {
        privacy: 'https://policies.google.com/privacy'
    }
}

export const SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: `${COOKIE_NAME_PREFIX}-ga-universal`,
    provider: Provider.Iota,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Stores the user´s Google Analytics Universal cookies consent state for the current domain',
    expiry: COOKIE_EXPIRATION_DAYS+ ' days',
    type: CookieType.HTTP,
}

export const SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: `${COOKIE_NAME_PREFIX}-ga-4`,
    provider: Provider.Iota,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Stores the user´s Google Analytics 4 cookies consent state for the current domain',
    expiry: COOKIE_EXPIRATION_DAYS+ ' days',
    type: CookieType.HTTP,
}
 
export const NECESSARY_COOKIES = {
    [SupportedService.GoogleAnalyticsUniversal]: SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE,
    [SupportedService.GoogleAnalytics4]: SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE,
} 

export const GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: CookieType.HTTP,
}

export const GAT_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gat',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Used by Google Analytics to throttle request rate.',
    expiry: '1 day',
    type: CookieType.HTTP
}

export const GID_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gid',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '1 day',
    type: CookieType.HTTP
}

export const GAC_PROPERTY_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE: ServiceCookie = {
    name: '_gac_<property-id>',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: ' Contains campaign related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.',
    expiry: '90 days',
    type: CookieType.HTTP
}

export const GA_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
    purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
    expiry: '2 years',
    type: CookieType.HTTP
}

export const GA_CONTAINER_GOOGLE_ANALYTICS_4_COOKIE: ServiceCookie = {
    name: '_ga_<container-id>',
    provider: Provider.Google,
    providerUrl: RELEVANT_LINKS.Google.privacy,
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