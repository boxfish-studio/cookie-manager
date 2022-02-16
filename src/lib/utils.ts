/*
 * General utils for managing cookies in Typescript.
 * Source: https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
 */

export function getCookie(name: string): string | undefined {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts?.length == 2) {
        return parts?.pop()?.split(';')?.shift() ?? undefined;
    }
}

export const setCookie = (name: string, val: string, expDays: number): void => {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
};


/*
 * Google Analytics utils.
 */

export const loadGoogleAnalytics = (gaID: string): void => {
    window.dataLayer = window.dataLayer || [];
    function gtag(key: string, value: unknown) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', gaID);

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaID}`;
    document.body.appendChild(script);
};


export const updatePathGA = (gaID: string, path): void => {
    window.dataLayer = window.dataLayer || [];
    function gtag(key: string, value: unknown, { page_path: string }) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    }
    gtag('config', gaID, {
        page_path: path
    });
};
