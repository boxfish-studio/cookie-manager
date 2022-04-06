<script lang="ts">
	import type { StylesConfiguration } from '$lib/types';
	export let onClick: () => void = () => {};
	export let styles: StylesConfiguration ;
</script>

<button on:click={onClick} style="--primary:{styles?.primary}; --light:{styles?.light}">
	<slot />
</button>

<style type="text/scss">
	button {
		text-transform: uppercase;
		display: block;
		width: max-content;
		padding: 0.75rem;
		font-weight: 700;
		margin-bottom: 0.6rem;
		cursor: pointer;
		border: none;
		border-radius: 6px;
		background-color: var(--primary);
		color: var(--light);
	}
</style>
