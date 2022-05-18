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

<div id="skcm-cookie-library"
	style="--primary:{configuration?.theme?.primary}; --dark:{configuration?.theme
		?.dark}; --medium:{configuration?.theme?.medium}; --light:{configuration?.theme?.light}"
>
	{#each information as section}
		{#if section?.title}
			<h4 id="skcm-cookie-library__h4">{section?.title}</h4>
			<hr id="skcm__hr"/>
		{/if}
		{#if section?.body}
			{#each section?.body as paragraphs}
				<p  id="skcm-cookie-library__p">
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

	<div id="skcm-preferences">
		<label id="skcm-preferences__label">
			<input id="skcm-preferences__radio"
			type="radio" bind:group={hasAllowedCookies} value={'false'} />
			Reject
		</label>
		<label id="skcm-preferences__label">
			<input id="skcm-preferences__radio"
			type="radio" bind:group={hasAllowedCookies} value={'true'} />
			Allow
		</label>
		<Button onClick={updatePreferences} id="skcm-preferences__button">Update Cookie Preference</Button>
	</div>
</div>

<style lang="scss">
	#skcm-preferences {
		max-width: 250px;
	}
</style>
