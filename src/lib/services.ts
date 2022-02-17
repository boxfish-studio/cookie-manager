import { browser } from "$app/env";
import { get } from 'svelte/store';
import { configuredServices, servicesInitialized } from './store';
import { SuportedService } from './types';

export const initializeServices = (): void => {
    if (!get(servicesInitialized)) {
        const googleAnalyticsUniversalConfig = get(configuredServices)?.find(({ type }) => type === SuportedService.GoogleAnalyticsUniversal)
        if (googleAnalyticsUniversalConfig?.enabled) {
            loadGoogleAnalytics(googleAnalyticsUniversalConfig.id);
        }
        servicesInitialized.set(true);
    }
}

/*
 * Google Analytics utils.
 */

export const loadGoogleAnalytics = (id: string): void => {
    function gtag(key: string, value: unknown) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }
    if (browser) {
        window.dataLayer = window.dataLayer || [];

        gtag('js', new Date());
        gtag('config', id);

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.body.appendChild(script);
    }
};

export const updatePathGA = (id: string, path): void => {
    function gtag(key: string, value: unknown, { page_path: string }) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }
    if (browser) {
        window.dataLayer = window.dataLayer || [];
        gtag('config', id, {
            page_path: path
        });
    }
};
