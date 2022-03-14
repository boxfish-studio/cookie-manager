<script lang="ts">
	import { onMount } from 'svelte';
	import { submitNecessaryCookies } from '$lib/utils';
	import { initializeServices, stopServices } from '$lib/services';
	import { servicesInitialized, showCookieDisclaimer } from '$lib/store';
	import { AdditionalCookies } from '$components';
	import { Button } from '$components';
	import { information } from './cookies.json';
	import { NecessaryCookies } from '$components';

	let areCookiesAllowed: 'true' | 'false';
	onMount(() => {
		showCookieDisclaimer.set(false);
	});

	function updatePreferences() {
		servicesInitialized.set(false);
		submitNecessaryCookies(areCookiesAllowed);
		if (areCookiesAllowed === 'true') {
			initializeServices();
		} else {
			if (areCookiesAllowed === 'false') {
				stopServices();
			}
		}
	}
</script>

{#each information as section}
	{#if section?.title}
		<h4>{section?.title}</h4>
	{/if}
	{#if section?.body}
		{#each section?.body as paragraphs}
			<p>
				{paragraphs?.paragraph}
			</p>
		{/each}
	{/if}
	{#if section?.id === 'necessaryCookies'}
		<NecessaryCookies />
	{:else if section?.id === 'aditionalCookies'}
		<AdditionalCookies />
	{/if}
{/each}

<div id="svkm-preferences-wrapper">
	<label>
		<input type="radio" bind:group={areCookiesAllowed} value={'false'} />
		Reject
	</label>
	<label>
		<input type="radio" bind:group={areCookiesAllowed} value={'true'} />
		Allow
	</label>
</div>
<Button onClick={updatePreferences}>Update Cookie Preference</Button>
