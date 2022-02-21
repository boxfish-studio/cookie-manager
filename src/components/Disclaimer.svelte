<script lang="ts">
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
	export let title: string = undefined;
	export let body: string = undefined;
	export let acceptButtonText: string = undefined;
	export let rejectButtonText: string = undefined;
	export let primaryColor: string = undefined;
	export let buttonTextColor: string = undefined;
	export let policyUrl: string = undefined;
</script>

<div id="skcm-banner">
	<div>
		<h6>{title}</h6>
		<p>{body}</p>
	</div>
	<div class="button-wrapper">
		<button
			style="--primaryColor: {primaryColor}; color: {buttonTextColor}; "
			on:click={allowCookies}>{acceptButtonText}</button
		>
		<button
			style="--primaryColor: {primaryColor};  color: {buttonTextColor};"
			on:click={declineCookies}>{rejectButtonText}</button
		>
	</div>
</div>

<style type="text/scss">
	#skcm-banner {
		background-color: white;
		position: fixed;
		bottom: 2.625rem;
		right: 50px;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		max-width: 425px;
		h6 {
			margin: 0;
			font-size: 1.25rem;
		}
		p {
			font-size: 0.875rem;
			margin-top: 1.5rem;
			line-height: 1.31rem;
		}
		.button-wrapper {
			margin-top: 2rem;

			button {
				text-transform: uppercase;
				display: block;
				width: 100%;
				padding: 0.75rem;
				font-weight: 700;
				margin-bottom: 0.6rem;
				cursor: pointer;
				border: none;
				border-radius: 6px;
				background-color: var(--primaryColor);
				color: var(--buttonTextColor);
			}
		}
	}
</style>
