<script lang="ts">
	export let onClick: () => void = () => {};
</script>

<button on:click={onClick}> <slot /> </button>

<style type="text/scss">
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
		background-color: $skcm-primary;
		color: $skcm-white;
	}
</style>
