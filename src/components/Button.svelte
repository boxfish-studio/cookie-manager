<script lang="ts">
	export let onClick: () => void = () => {};
	export let bgColor: string = '#14cabf';
	export let textColor: string = '#fff';
</script>

<button on:click={onClick} style="--bg-color:{bgColor}; --text-color:{textColor}">
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
		background-color: var(--bg-color);
		color: var(--text-color);
	}
</style>
