import { browser } from "$app/env";
import { page } from '$app/stores';

/*
 * Google Analytics utils.
 */

export const initializeGoogleAnalyticsUniversal = (googleAnalyticsUniversalId: string): void => {
    loadGoogleAnalytics(googleAnalyticsUniversalId);
    page?.subscribe(($page) => {
        if ($page?.url?.pathname) {
            updatePathGA(googleAnalyticsUniversalId as string, $page.url.pathname)
        }
    })
}

export const loadGoogleAnalytics = (gaID: string): void => {
    function gtag(key: string, value: unknown) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }
    if (browser) {
        window.dataLayer = window.dataLayer || [];

        gtag('js', new Date());
        gtag('config', gaID);

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaID}`;
        document.body.appendChild(script);
    }
};

export const updatePathGA = (gaID: string, path): void => {
    function gtag(key: string, value: unknown, { page_path: string }) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }
    if (browser) {
        window.dataLayer = window.dataLayer || [];
        gtag('config', gaID, {
            page_path: path
        });
    }
};
