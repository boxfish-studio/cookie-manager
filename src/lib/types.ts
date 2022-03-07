export enum SupportedService {
    GoogleAnalyticsUniversal = 'googleAnalyticsUniversal',
    GoogleAnalytics4 = 'googleAnalytics4',
}

export type Service = {
    type: SupportedService;
    id?: string,
    enabled?: boolean
}

export type DisclaimerConfiguration = {
    title?: string,
    body?: string,
    policyText?: string,
    policyUrl?: string,
    acceptButtonText?: string,
    rejectButtonText?: string,
}

export type ServicesConfiguration = {
    googleAnalyticsUniversalId?: string,
    googleAnalytics4Id?: string
}

export type SKCMConfiguration = {
    disclaimer?: DisclaimerConfiguration,
    services?: ServicesConfiguration
}
