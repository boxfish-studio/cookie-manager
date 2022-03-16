import { browser } from "$app/env";
import { get } from 'svelte/store';
import { configuredServices, servicesInitialized } from './store';
import { GoogleOwnCookies } from './cookieLib'
import { SupportedService } from './types';
import { deleteCookie } from './utils';

export const initializeServices = (): void => {
    if (!get(servicesInitialized)) {
        const googleAnalyticsUniversalConfig = get(configuredServices)?.find(({ type }) => type === SupportedService.GoogleAnalyticsUniversal)
        const googleAnalytics4Config = get(configuredServices)?.find(({ type }) => type === SupportedService.GoogleAnalytics4)
        if (googleAnalyticsUniversalConfig?.enabled) {
            loadGoogleAnalytics(googleAnalyticsUniversalConfig.id);
        }
        else {
            if (googleAnalytics4Config?.enabled) {
                loadGoogleAnalytics(googleAnalytics4Config.id);
            }
        }
        servicesInitialized.set(true);
    }
}

export const stopServices = (): void => {
    let enabledServices: Array<object> = [];
    enabledServices = get(configuredServices)?.filter((enabled) => enabled)?.map((service) =>
        service.cookies.forEach((cookie) => {
            deleteCookie(cookie.name)
        })
    )
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
