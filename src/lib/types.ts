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

export type ServiceCookie ={
    name: string,
    provider: string,
    providerUrl: string,
    purpose: string,
    expiry: string,
    type: string
}
