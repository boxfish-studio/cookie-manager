<script lang="ts">
	export let onClick: () => void = () => {}
</script>

<button on:click={onClick}>
	<slot />
</button>
