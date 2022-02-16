import { COOKIE_NAME_PREFIX } from './constants';

export enum SuportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export const SupportedNecessaryCookies = {
    [SuportedService.GoogleAnalyticsUniversal]: `${COOKIE_NAME_PREFIX}-ga-universal`,
    [SuportedService.GoogleAnalytics4]: `${COOKIE_NAME_PREFIX}-ga-4`,
}

export type Service = {
    type: SuportedService;
    id?: string,
    enabled?: boolean
}
