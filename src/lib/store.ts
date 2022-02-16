import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { Service, SuportedService, SupportedCookieTracking } from './types';
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
                enabled: getCookie(SupportedCookieTracking[SuportedService.GoogleAnalyticsUniversal]) === 'true'
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SuportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: getCookie(SupportedCookieTracking[SuportedService.GoogleAnalytics4]) === 'true'
            }
        );
    }
    configuredServices.set(_configuredServices)
}
