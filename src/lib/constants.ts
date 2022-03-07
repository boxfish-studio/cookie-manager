import type { DisclaimerConfiguration } from './types';
import { SupportedService } from './types';

export const COOKIE_EXPIRATION_DAYS = 30;

export const COOKIE_NAME_PREFIX = 'skcm-';

export const NECESSARY_COOKIES = {
    [SupportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SupportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}

export const DEFAULT_DISCLAIMER_CONFIG: DisclaimerConfiguration = {
    title: 'Cookie Preferences',
    body: 'For an optimal website experience, we use cookies and similar technologies to show personalized content, offer features and collect statistics. Clicking on "Accept" allows us to process this data and share it with third parties according to our privacy policy. You can view and change the current settings at any time.',
    policyText: 'Read our cookie policy',
    policyUrl: 'https://iota.org/privacy-policy',
    acceptButtonText: 'Accept Additional Cookies',
    rejectButtonText: 'Reject Additional Cookies'
}
