import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { SuportedService, SupportedCookieTracking } from './types';
import { getCookie } from './utils';

export const showCookieDisclaimer: Writable<boolean> = writable(false);
export const configuredServices: Writable<{ type: SuportedService; id?: string, enabled?: boolean }[]> = writable([]);

export function initConfiguredServices(googleAnalyticsUniversalId: string, googleAnalytics4Id: string): void {
    const _configuredServices = []
    if (googleAnalyticsUniversalId) {
        _configuredServices.push(
            {
                type: SuportedService.GoogleAnalyticsUniversal,
                id: googleAnalyticsUniversalId,
                enabled: false
            }
        );
    }
    if (googleAnalytics4Id) {
        _configuredServices.push(
            {
                type: SuportedService.GoogleAnalytics4,
                id: googleAnalytics4Id,
                enabled: false
            }
        );
    }
    configuredServices.set(_configuredServices)
}

// Update configuration store with the current cookie values
export function updateConfiguredServices(): void {
    let _configuredServices = get(configuredServices)
    _configuredServices = _configuredServices.map(
        (service: { type: SuportedService; id?: string, enabled?: boolean }) => {
            const _previouslyEnabled = getCookie(SupportedCookieTracking[service.type]) === 'true';
            return {
                ...service,
                enabled: _previouslyEnabled
            };
        }
    );
    configuredServices.set(_configuredServices)
}
