<script lang="ts">
	import { onMount } from 'svelte'
	import { submitNecessaryCookies } from '$lib/app/utils'
	import { initializeServices, stopServices } from '$lib/app/services'
	import { showCookieDisclaimer } from '$lib/app/store'
	import type { SKCMConfiguration } from '$lib/app/types'
	import { AdditionalCookies } from '../'
	import { Button } from '../'
	import { information } from './cookies.json'
	import { NecessaryCookies } from '../'

	export let configuration: SKCMConfiguration = {
		theme: {
			primary: '#14cabf',
			light: '#fff',
			medium: '#b0bfd9',
			dark: '#131f37'
		}
	}

	let hasAllowedCookies: 'true' | 'false'
	onMount(() => {
		showCookieDisclaimer.set(false)
	})

	function updatePreferences() {
		submitNecessaryCookies(hasAllowedCookies)
		if (hasAllowedCookies === 'true') {
			initializeServices()
		} else {
			if (hasAllowedCookies === 'false') {
				stopServices()
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

	<div id="svkm-preferences-wrapper">
		<label>
			<input type="radio" bind:group={hasAllowedCookies} value={'false'} />
			Reject
		</label>
		<label>
			<input type="radio" bind:group={hasAllowedCookies} value={'true'} />
			Allow
		</label>
		<Button onClick={updatePreferences}>Update Cookie Preference</Button>
	</div>
</div>

<style lang="scss">
	#svkm-preferences-wrapper {
		max-width: 250px;
	}
</style>
