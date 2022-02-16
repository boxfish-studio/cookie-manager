export enum SuportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export const SupportedCookieTracking = {
    [SuportedService.GoogleAnalyticsUniversal]: 'skcm-ga-universal',
    [SuportedService.GoogleAnalytics4]: 'skcm-ga-4',
}

export type Service = {
    type: SuportedService;
    id?: string,
    enabled?: boolean
}
