<script lang="ts">
	import type { Theme } from '$lib/types';
	export let onClick: () => void = () => {};
	export let theme: Theme;
</script>

<button on:click={onClick} style="--primary:{theme?.primary}; --light:{theme?.light}">
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
