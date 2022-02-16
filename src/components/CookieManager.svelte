<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getCookie, setCookie, loadGoogleAnalytics, updatePathGA } from '$lib/utils';

	export let googleAnalyticsUniversalId: string = '';

	let COOKIES = {
		googleAnalyticsUniversal: { name: 'ga_universal', enabled: false },
		googleAnalytics4: { name: 'ga_4', enabled: false }
	};

	let showCookieDisclaimer: boolean = false;
	let mounted: boolean = false;

	onMount(() => {
		showCookieDisclaimer = anyUnkownCookie();
		//update status of each cookie to load or not each service
		for (const service in COOKIES) {
			COOKIES[service].enabled = getCookie(COOKIES[service].name) === 'true';
		}

		if (COOKIES['googleAnalyticsUniversal'].enabled && googleAnalyticsUniversalId) {
			loadGoogleAnalytics(googleAnalyticsUniversalId as string);
		}
		mounted = true;
	});

	//Check user has accepted/rejected all our cookies
	const anyUnkownCookie = (): boolean => {
		for (const service in COOKIES) {
			if (!getCookie(COOKIES[service].name)?.length) {
				return true;
			}
		}
		return false;
	};

	const allowCookies = (): void => {
		for (const service in COOKIES) {
			setCookie(COOKIES[service].name, 'true', 30);
		}
		showCookieDisclaimer = false;
		if (googleAnalyticsUniversalId) {
			loadGoogleAnalytics(googleAnalyticsUniversalId as string);
		}
	};

	const declineCookies = (): void => {
		for (const service in COOKIES) {
			setCookie(COOKIES[service].name, 'false', 30);
		}
		showCookieDisclaimer = false;
	};

	$: if ($page.url.pathname && mounted) {
		updatePathGA(googleAnalyticsUniversalId as string, $page.url.pathname);
	}
</script>

{#if showCookieDisclaimer}
	<div>
		<div>
			<span>By using this site, you agree with our cookies policy. </span>
		</div>
		<div>
			<button on:click={allowCookies}>Accept</button>
			<button on:click={declineCookies}>Decline</button>
		</div>
	</div>
{/if}
