<script lang="ts">
	import { DEFAULT_DISCLAIMER_CONFIG, DEFAULT_THEME_COLORS } from '$lib/app/constants'
	import { setStyleString } from '$lib/app/utils'
	import { Button } from './'
	import type { DisclaimerConfiguration, Theme } from '$lib/app/types'

	export let configuration: DisclaimerConfiguration = {}
	export let theme: Theme = DEFAULT_THEME_COLORS
	export let allowCookies: () => void = () => {}
	export let declineCookies: () => void = () => {}

	let style: string = ''
	$: theme, (style = setStyleString(theme))
	$: ({ title, body } = configuration)
</script>

<div id="skcm-banner" {style}>
	<div>
		{#if title}
			<h6>
				{title}
			</h6>
		{/if}
		<p>
			{body ?? DEFAULT_DISCLAIMER_CONFIG.body}
			<a href={configuration?.policyUrl ?? DEFAULT_DISCLAIMER_CONFIG.policyUrl} target="_blank"
				><span>{configuration?.policyText ?? DEFAULT_DISCLAIMER_CONFIG.policyText}</span></a
			>
		</p>
	</div>
	<div class="button-wrapper">
		<Button onClick={allowCookies}
			>{configuration?.acceptButtonText ?? DEFAULT_DISCLAIMER_CONFIG.acceptButtonText}</Button
		>
		<Button onClick={declineCookies}
			>{configuration?.rejectButtonText ?? DEFAULT_DISCLAIMER_CONFIG.rejectButtonText}
		</Button>
	</div>
</div>

<style lang="scss">
	#skcm-banner {
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
