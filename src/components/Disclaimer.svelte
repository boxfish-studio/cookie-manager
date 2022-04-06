<script lang="ts">
	import { DEFAULT_DISCLAIMER_CONFIG } from '$lib/constants';
	import type { DisclaimerConfiguration, StylesConfiguration } from '$lib/types';
	import { Button } from './';

	export let configuration: DisclaimerConfiguration;
	export let styles: StylesConfiguration = {
		light: '#fff',
		dark: '#131f37',
		medium: '#b0bfd9',
		primary: '#14cabf'
	};

	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
</script>

<div id="skcm-banner" style="--light:{styles?.light}">
	<div>
		<h6 style="--dark:{styles?.dark}">
			{configuration?.title ?? DEFAULT_DISCLAIMER_CONFIG.title}
		</h6>
		<p style="--dark:{styles?.dark}">
			{configuration?.body ?? DEFAULT_DISCLAIMER_CONFIG.body}
			<a
				style="--primary:{styles?.primary}"
				href={configuration?.policyUrl ?? DEFAULT_DISCLAIMER_CONFIG.policyUrl}
				target="_blank"
				><span>{configuration?.policyText ?? DEFAULT_DISCLAIMER_CONFIG.policyText}</span></a
			>
		</p>
	</div>
	<div class="button-wrapper">
		<Button light={styles?.light} primary={styles?.primary} onClick={allowCookies}
			>{configuration?.acceptButtonText ?? DEFAULT_DISCLAIMER_CONFIG.acceptButtonText}</Button
		>
		<Button light={styles?.light} primary={styles?.primary} onClick={declineCookies}
			>{configuration?.rejectButtonText ?? DEFAULT_DISCLAIMER_CONFIG.rejectButtonText}
		</Button>
	</div>
</div>

<style type="text/scss">
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
