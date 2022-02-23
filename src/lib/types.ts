export enum SupportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export type Service = {
    type: SupportedService;
    id?: string,
    enabled?: boolean,
    relatedCookies?,
}
