import { SupportedService } from './types';

export const COOKIE_EXPIRATION_DAYS = 30;

export const COOKIE_NAME_PREFIX = 'skcm-';

export const NecessaryCookies = {
    [SupportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SupportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}
