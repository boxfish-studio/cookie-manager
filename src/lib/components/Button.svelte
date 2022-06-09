<script lang="ts">
	export let onClick: () => void = () => {}
	export let id: string = undefined
	export let disabled: boolean = true
</script>

<button on:click={onClick} {id} {disabled}>
	<slot />
</button>

<style lang="scss">
		#skcm-cookie-library__preferences__button {
		opacity: 1;
		transition: opacity 0.2s ease-in;
		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
