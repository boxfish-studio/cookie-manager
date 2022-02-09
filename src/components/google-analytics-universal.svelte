<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let googleAnalyticsId;
	const COOKIES_ENABLED_NAME = 'ga_universal';
	let showCookieDisclaimer = false;
	let cookiesEnabled;
	let mounted = false;
	console.log(googleAnalyticsId);
	onMount(() => {
		if (googleAnalyticsId) {
			cookiesEnabled = getCookie(COOKIES_ENABLED_NAME) === 'true';
			showCookieDisclaimer = !getCookie(COOKIES_ENABLED_NAME)?.length;
			if (cookiesEnabled) {
				loadGoogleAnalytics(googleAnalyticsId as string);
			}
		}
		mounted = true;
	});

	const allowCookies = (): void => {
		if (googleAnalyticsId) {
			loadGoogleAnalytics(googleAnalyticsId as string);
			setCookie(COOKIES_ENABLED_NAME, 'true', 30);
			showCookieDisclaimer = false;
		}
	};

	const declineCookies = (): void => {
		if (googleAnalyticsId) {
			setCookie(COOKIES_ENABLED_NAME, 'false', 30);
			showCookieDisclaimer = false;
		}
	};

	const loadGoogleAnalytics = (gaID: string): void => {
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

	const updatePathGA = (gaID: string, path): void => {
		window.dataLayer = window.dataLayer || [];
		function gtag(key: string, value: unknown, { page_path: string }) {
			// eslint-disable-next-line prefer-rest-params
			window.dataLayer.push(arguments);
		}
		gtag('config', gaID, {
			page_path: path
		});
	};

	$: if ($page.url.pathname && mounted) {
		updatePathGA(googleAnalyticsId as string, $page.url.pathname);
	}

	/*
	 * General utils for managing cookies in Typescript.
	 * Source: https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
	 */
	function getCookie(name: string): string | undefined {
		const value = '; ' + document.cookie;
		const parts = value.split('; ' + name + '=');

		if (parts?.length == 2) {
			return parts?.pop()?.split(';')?.shift() ?? undefined;
		}
	}
	const setCookie = (name: string, val: string, expDays: number): void => {
		const date = new Date();
		const value = val;
		date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
		document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
	};
</script>

{#if showCookieDisclaimer}
	<div>
		<div>
			<span>By using this site, you agree with Google Analytics Universal cookies policy. </span>
		</div>
		<div>
			<div>
				<button on:click={allowCookies}>Accept</button>
			</div>
			<div><button on:click={declineCookies}>Decline</button></div>
		</div>
	</div>
{/if}
