<script lang="ts">
	export let allowCookies: () => void = () => {};
	export let declineCookies: () => void = () => {};
</script>

<div>
	<div>
		<span>By using this site, you agree with our cookies policy. </span>
	</div>
	<div>
		<button on:click={allowCookies}>Accept</button>
		<button on:click={declineCookies}>Decline</button>
	</div>
</div>
