<script lang="ts">
	export let onClick: () => void = () => {};
	export let primary: string = '#14cabf';
	export let light: string = '#fff';
</script>

<button on:click={onClick} style="--primary:{primary}; --light:{light}">
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
