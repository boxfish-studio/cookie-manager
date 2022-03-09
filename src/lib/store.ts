import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { NECESSARY_COOKIES } from './constants';
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
                enabled: getCookie(NECESSARY_COOKIES[SupportedService.GoogleAnalyticsUniversal]) === 'true'
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SupportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: getCookie(NECESSARY_COOKIES[SupportedService.GoogleAnalytics4]) === 'true'
            }
        );
    }
    configuredServices.set(_configuredServices)
}
