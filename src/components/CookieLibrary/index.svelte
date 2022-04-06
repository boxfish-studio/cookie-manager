<script lang="ts">
	import { onMount } from 'svelte';
	import { submitNecessaryCookies } from '$lib/utils';
	import { initializeServices, stopServices } from '$lib/services';
	import { showCookieDisclaimer } from '$lib/store';
	import type { SKCMConfiguration } from '$lib/types';
	import { AdditionalCookies } from '$components';
	import { Button } from '$components';
	import { information } from './cookies.json';
	import { NecessaryCookies } from '$components';

	export let configuration: SKCMConfiguration = {
		theme: {
			primary: '#14cabf',
			light: '#fff',
			medium: '#b0bfd9',
			dark: '#131f37'
		}
	};

	let hasAllowedCookies: 'true' | 'false';
	onMount(() => {
		showCookieDisclaimer.set(false);
	});

	function updatePreferences() {
		submitNecessaryCookies(hasAllowedCookies);
		if (hasAllowedCookies === 'true') {
			initializeServices();
		} else {
			if (hasAllowedCookies === 'false') {
				stopServices();
			}
		}
	}
</script>

<div
	style="--primary:{configuration?.theme?.primary}; --dark:{configuration?.theme
		?.dark}; --medium:{configuration?.theme?.medium}; --light:{configuration?.theme?.light}"
>
	{#each information as section}
		{#if section?.title}
			<h4>{section?.title}</h4>
			<hr />
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
		{:else if section?.id === 'additionalCookies'}
			<AdditionalCookies />
		{/if}
	{/each}
</div>
<div id="svkm-preferences-wrapper">
	<label>
		<input type="radio" bind:group={hasAllowedCookies} value={'false'} />
		Reject
	</label>
	<label>
		<input type="radio" bind:group={hasAllowedCookies} value={'true'} />
		Allow
	</label>
	<Button theme={configuration?.theme} onClick={updatePreferences}>Update Cookie Preference</Button>
</div>

<style type="text/scss">
	#svkm-preferences-wrapper {
		max-width: 250px;
	}
</style>
