<script lang="ts">
	export let onClick: () => void = () => {}
	export let id: string = undefined
</script>

<button on:click={onClick} {id}>
	<slot />
</button>
