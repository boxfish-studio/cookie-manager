import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { NecessaryCookies } from './constants';
import { Service, SuportedService } from './types';
import { getCookie } from './utils';

export const showCookieDisclaimer: Writable<boolean> = writable(false);
export const configuredServices: Writable<Service[]> = writable([]);

export function initConfiguredServices(googleAnalyticsUniversalId: string, googleAnalytics4Id: string): void {
    const _configuredServices = []
    if (googleAnalyticsUniversalId) {
        _configuredServices.push(
            {
                type: SuportedService.GoogleAnalyticsUniversal,
                id: googleAnalyticsUniversalId,
                enabled: getCookie(NecessaryCookies[SuportedService.GoogleAnalyticsUniversal]) === 'true'
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SuportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: getCookie(NecessaryCookies[SuportedService.GoogleAnalytics4]) === 'true'
            }
        );
    }
    configuredServices.set(_configuredServices)
}
