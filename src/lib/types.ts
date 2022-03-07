export enum SupportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export type Service = {
    type: SupportedService;
    id?: string,
    enabled?: boolean
}

export type ServicesKeys = {
    googleAnalyticsUniversalId?: string,
    googleAnalytics4Id?: string
}

export type SKCMConfiguration = {
    title?: string,
    body?: string,
    policyText?: string,
    policyUrl?: string,
    acceptButtonText?: string,
    rejectButtonText?: string,
    servicesKeys?: ServicesKeys
}
