import { SupportedService } from './types';

export const COOKIE_EXPIRATION_DAYS = 30;

export const COOKIE_NAME_PREFIX = 'skcm-';

export const NecessaryCookies = {
    [SupportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SupportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}

export const GoogleOwnCookies = {
    GoogleAnalyticsUniversal: [
        {
            name: '_ga',
            provider: 'Google',
            purpose: 'whatever',
            expiry: '30 days',
            type: 'HTTP'
        },
        {
            name: '_gid',
            provider: 'Google',
            purpose: 'whatever',
            expiry: '60 days',
            type: 'HTTP'
        }
    ],
    GoogleAnalytics4: [
        {
            name: '_graune',
            provider: 'Google',
            purpose: 'whatever',
            expiry: '30 days',
            type: 'HTTP'
        }
    ]
}
