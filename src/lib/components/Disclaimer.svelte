<script lang="ts">
	import { DEFAULT_DISCLAIMER_CONFIG, DEFAULT_THEME_COLORS } from '$lib/app/constants'
	import type { DisclaimerConfiguration, Theme } from '$lib/app/types'
	import { getInlineStyle } from '$lib/app/utils'
	import { Button } from './'

	export let configuration: DisclaimerConfiguration = {}
	export let theme: Theme = DEFAULT_THEME_COLORS
	export let allowCookies: () => void = () => {}
	export let declineCookies: () => void = () => {}

	let style: string = ''

	$: ({ title, body } = configuration)
	$: style = getInlineStyle(theme)
</script>

<div id="skcm-cookie-disclaimer" {style}>
	<div id="skcm-cookie-disclaimer__body">
		{#if title}
			<h6 id="skcm-title">
				{title}
			</h6>
		{/if}
		<p id="skcm-body">
			{body ?? DEFAULT_DISCLAIMER_CONFIG.body}
			<a
				href={configuration?.policyUrl ?? DEFAULT_DISCLAIMER_CONFIG.policyUrl}
				target="_blank"
				rel="noopener noreferrer"
				><span id="skcm-link__span"
					>{configuration?.policyText ?? DEFAULT_DISCLAIMER_CONFIG.policyText}</span
				></a
			>
		</p>
	</div>
	<div id="skcm-cookie-disclaimer__buttons">
		<Button onClick={allowCookies} id="skcm-cookie-disclaimer__buttons--allow"
			>{configuration?.acceptButtonText ?? DEFAULT_DISCLAIMER_CONFIG.acceptButtonText}</Button
		>
		<Button onClick={declineCookies} id="skcm-cookie-disclaimer__buttons--reject"
			>{configuration?.rejectButtonText ?? DEFAULT_DISCLAIMER_CONFIG.rejectButtonText}
		</Button>
	</div>
</div>

<style lang="scss">
	#skcm-cookie-disclaimer {
		position: fixed;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		background-color: var(--light);
		max-width: 100vw;
		bottom: 0;
		right: 0;
		border-radius: 0;
		z-index: 99999;
		@media (min-width: 640px) {
			max-width: 425px;
			bottom: 2.625rem;
			right: 3rem;
			border-radius: 6px;
		}
	}
</style>
