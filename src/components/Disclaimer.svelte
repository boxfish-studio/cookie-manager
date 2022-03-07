<script lang="ts">
	import { Button } from './';
	import type { DisclaimerDetails } from '$lib/types';
	import { defaultDisclaimerDetails } from '$lib/constants';
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
	export let disclaimerDetails: DisclaimerDetails;
</script>

<div id="skcm-banner">
	<div>
		<h6>{disclaimerDetails?.title ?? defaultDisclaimerDetails.title}</h6>
		<p>
			{disclaimerDetails?.body ?? defaultDisclaimerDetails.body}
			<a href={disclaimerDetails?.policyUrl ?? defaultDisclaimerDetails.policyUrl} target="_blank"
				><span>{disclaimerDetails?.policyText ?? defaultDisclaimerDetails.policyText}</span></a
			>
		</p>
	</div>
	<div class="button-wrapper">
		<Button onClick={allowCookies}
			>{disclaimerDetails?.acceptButtonText ?? defaultDisclaimerDetails.acceptButtonText}</Button
		>
		<Button onClick={declineCookies}
			>{disclaimerDetails?.rejectButtonText ?? defaultDisclaimerDetails.rejectButtonText}
		</Button>
	</div>
</div>

<style type="text/scss">
	#skcm-banner {
		position: fixed;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		background-color: $skcm-white;
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
