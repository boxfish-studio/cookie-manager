import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { getCookie } from './utils';
import { GoogleOwnCookies } from './cookieLib';
import { SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE, SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE } from './cookieLib';
import type { Service } from './types';
import { SupportedService } from './types';

export const showCookieDisclaimer: Writable<boolean> = writable(false);
export const configuredServices: Writable<Service[]> = writable([]);
export const servicesInitialized: Writable<boolean> = writable(false);

export function initConfiguredServices(googleAnalyticsUniversalId: string, googleAnalytics4Id: string): void {
    const _configuredServices = []

    if (googleAnalyticsUniversalId) {
        _configuredServices.push(
            {
                type: SupportedService.GoogleAnalyticsUniversal,
                id: googleAnalyticsUniversalId,
                enabled: getCookie(SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE?.name) === 'true',
                cookies: GoogleOwnCookies.GoogleAnalyticsUniversal
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SupportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: getCookie(SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE?.name) === 'true',
                cookies: GoogleOwnCookies.GoogleAnalytics4
            }
        );
    }
    configuredServices.set(_configuredServices)
}
