<script lang="ts">
	export let bgColor: string = '#14CABF';
	export let textColor: string = '#FFF';
	export let text: string = '#FFF';
	export let onClick: () => void = () => {};
</script>

<button on:click={onClick}>{text}</button>

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
		background-color: $svkc-button-bg-color;
		color: $svkc-button-text-color;
	}
</style>
