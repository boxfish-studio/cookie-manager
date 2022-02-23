<script lang="ts">
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
	export let title: string = 'Cookie Preferences';
	export let body: string =
		'For an optimal website experience, we use cookies and similar technologies to show personalized content, offer features and collect statistics. Clicking on "Accept" allows us to process this data and share it with third parties according to our privacy policy. You can view and change the current settings at any time.';
	export let policyText: string = 'Read our cookie policy';
	export let policyUrl: string = undefined;
	export let acceptButtonText: string = 'Accept Additional Cookies';
	export let rejectButtonText: string = 'Reject Additional Cookies';
	export let backgroundColor: string = '#FFF';
	export let textColor: string = '#131F37';
	export let anchorColor: string = '#FFF';
	export let buttonColor: string = '#14CABF';
	export let buttonTextColor: string = '#FFF';
</script>

<div id="skcm-banner" style="--backgroundColor: {backgroundColor};">
	<div>
		<h6 style="color: {textColor}; ">{title}</h6>
		<p style="color: {textColor}; ">
			{body}
			<a href={policyUrl} target="_blank" style="color: {anchorColor}; "
				><span> {policyText}</span></a
			>
		</p>
	</div>
	<div class="button-wrapper">
		<button style="--buttonColor: {buttonColor}; color: {buttonTextColor}; " on:click={allowCookies}
			>{acceptButtonText}</button
		>
		<button
			style="--buttonColor: {buttonColor};  color: {buttonTextColor};"
			on:click={declineCookies}>{rejectButtonText}</button
		>
	</div>
</div>

<style type="text/scss">
	#skcm-banner {
		position: fixed;
		padding: 2rem 1.5rem 1rem 1.5rem;
		border-radius: 6px;
		background-color: var(--backgroundColor);
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
			color: var(--textColor);
		}
		p {
			font-size: 0.875rem;
			margin-top: 1.5rem;
			line-height: 1.31rem;
			color: var(--textColor);
		}
		a {
			text-decoration: none;
			color: var(--anchorColor);
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
				background-color: var(--buttonColor);
				color: var(--buttonTextColor);
			}
		}
	}
</style>
