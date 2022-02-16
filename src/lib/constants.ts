import { SuportedService } from './types';

export const COOKIE_EXPIRATION_DAYS = 30;

export const COOKIE_NAME_PREFIX = 'skcm-';

export const SupportedNecessaryCookies = {
    [SuportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SuportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}
