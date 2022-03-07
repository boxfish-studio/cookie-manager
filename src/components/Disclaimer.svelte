<script lang="ts">
	import { DEFAULT_DISCLAIMER_CONFIG } from '$lib/constants';
	import type { DisclaimerConfiguration } from '$lib/types';
	import { Button } from './';

	export let configuration: DisclaimerConfiguration;
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
</script>

<div id="skcm-banner">
	<div>
		<h6>{configuration?.title ?? DEFAULT_DISCLAIMER_CONFIG.title}</h6>
		<p>
			{configuration?.body ?? DEFAULT_DISCLAIMER_CONFIG.body}
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

<style type="text/scss">
	#skcm-banner {
		position: fixed;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		background-color: $skcm-light;
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
		h6 {
			margin: 0;
			font-size: 1.25rem;
			color: $skcm-dark;
		}
		p {
			font-size: 0.875rem;
			margin-top: 1.5rem;
			line-height: 1.31rem;
			color: $skcm-dark;
		}
		a {
			text-decoration: none;
			color: $skcm-primary;
		}
		.button-wrapper {
			margin-top: 2rem;
		}
	}
</style>
