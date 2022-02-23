import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { NecessaryCookies, GoogleOwnCookies } from './constants';
import { SupportedService } from './types';
import type { Service } from './types';
import { getCookie } from './utils';

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
                enabled: getCookie(NecessaryCookies[SupportedService.GoogleAnalyticsUniversal]) === 'true',
                relatedCookies: GoogleOwnCookies.GoogleAnalyticsUniversal
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SupportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: getCookie(NecessaryCookies[SupportedService.GoogleAnalytics4]) === 'true',
                relatedCookies: GoogleOwnCookies.GoogleAnalytics4
            }
        );
    }
    configuredServices.set(_configuredServices)
}
