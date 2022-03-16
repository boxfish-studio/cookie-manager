<script lang="ts">
	import { onMount } from 'svelte';
	import { submitNecessaryCookies } from '$lib/utils';
	import { initializeServices, stopServices } from '$lib/services';
	import { servicesInitialized, showCookieDisclaimer } from '$lib/store';
	import { AdditionalCookies } from '$components';
	import { Button } from '$components';
	import { information } from './cookies.json';
	import { NecessaryCookies } from '$components';

	let hasAllowedCookies: 'true' | 'false';
	onMount(() => {
		showCookieDisclaimer.set(false);
	});

	function updatePreferences() {
		submitNecessaryCookies(hasAllowedCookies);
		if (hasAllowedCookies === 'true') {
			servicesInitialized.set(false);
			initializeServices();
		} else {
			if (hasAllowedCookies === 'false') {
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
		<input type="radio" bind:group={hasAllowedCookies} value={'false'} />
		Reject
	</label>
	<label>
		<input type="radio" bind:group={hasAllowedCookies} value={'true'} />
		Allow
	</label>
</div>
<Button onClick={updatePreferences}>Update Cookie Preference</Button>
