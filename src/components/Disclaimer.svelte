<script lang="ts">
	import { DEFAULT_DISCLAIMER_CONFIG } from '$lib/constants';
	import type { DisclaimerConfiguration } from '$lib/types';
	import { Button } from './';

	export let configuration: DisclaimerConfiguration;
	let bgColor: string = configuration?.colors?.light || '#fff';
	let textColor: string = configuration?.colors?.dark || '#131f37';
	let linkColor: string = configuration?.colors?.primary || '#14cabf';
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
</script>

<div id="skcm-banner" style="--bg-color:{bgColor}">
	<div>
		<h6 style="--text-color:{textColor}">
			{configuration?.title ?? DEFAULT_DISCLAIMER_CONFIG.title}
		</h6>
		<p style="--text-color:{textColor}">
			{configuration?.body ?? DEFAULT_DISCLAIMER_CONFIG.body}
			<a
				style="--link-color:{linkColor}"
				href={configuration?.policyUrl ?? DEFAULT_DISCLAIMER_CONFIG.policyUrl}
				target="_blank"
				><span>{configuration?.policyText ?? DEFAULT_DISCLAIMER_CONFIG.policyText}</span></a
			>
		</p>
	</div>
	<div class="button-wrapper">
		<Button
			textColor={configuration?.colors?.light}
			bgColor={configuration?.colors?.primary}
			onClick={allowCookies}
			>{configuration?.acceptButtonText ?? DEFAULT_DISCLAIMER_CONFIG.acceptButtonText}</Button
		>
		<Button
			textColor={configuration?.colors?.light}
			bgColor={configuration?.colors?.primary}
			onClick={declineCookies}
			>{configuration?.rejectButtonText ?? DEFAULT_DISCLAIMER_CONFIG.rejectButtonText}
		</Button>
	</div>
</div>

<style type="text/scss">
	#skcm-banner {
		position: fixed;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		background-color: var(--bg-color);
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

	h6 {
		color: var(--text-color);
	}
	a {
		color: var(--link-color);
	}
</style>
