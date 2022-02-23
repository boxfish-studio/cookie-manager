<script lang="ts">
	import { onMount } from 'svelte';
	import { configuredServices } from '$lib/store';
	import { get } from 'svelte/store';
	
    let allActiveCookies = [];
	onMount(async () => {
		allActiveCookies = get(configuredServices)?.map((service) => {
			return service.relatedCookies;
		});
	});
</script>

<table>
	<tbody>
		<tr>
			<td> Name </td>
			<td> Provider </td>
			<td> Purpose </td>
			<td> Expiry </td>
			<td> Type </td>
		</tr>
		{#each allActiveCookies as cookies, i}
			{#each cookies as cookie}
				<tr>
					<td> {cookie.name} </td>
					<td> {cookie.provider} </td>
					<td> {cookie.purpose} </td>
					<td> {cookie.expiry} </td>
					<td> {cookie.type} </td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>
