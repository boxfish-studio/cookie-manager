<script lang="ts">
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '$lib/utils';
	import { GoogleAnalyticsUniversal } from '$components';

	let COOKIES = {
		googleAnalyticsUniversal: { name: 'ga_universal', enabled: false },
		googleAnalytics4: { name: 'ga_4', enabled: false }
	};

	let showCookieDisclaimer: boolean = false;

	let googleAnalyticsUniversal;

	onMount(() => {
		showCookieDisclaimer = anyUnkownCookie() ? true : false;
		//update status of each cookie to load or not each service
		for (const service in COOKIES) {
			COOKIES[service].enabled = getCookie(COOKIES[service].name) === 'true';
		}
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
		googleAnalyticsUniversal.load();
	};

	const declineCookies = (): void => {
		for (const service in COOKIES) {
			setCookie(COOKIES[service].name, 'false', 30);
		}
		showCookieDisclaimer = false;
	};
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

<GoogleAnalyticsUniversal
	googleAnalyticsId={import.meta.env.VITE_GOOGLE_ANALYTICS_UNIVESAL_ID}
	bind:this={googleAnalyticsUniversal}
	enabled={COOKIES['googleAnalyticsUniversal'].enabled}
/>
