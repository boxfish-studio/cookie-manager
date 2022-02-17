export enum SuportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export type Service = {
    type: SuportedService;
    id?: string,
    enabled?: boolean
}
