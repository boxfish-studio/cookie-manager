<script lang="ts">
	import { onMount } from 'svelte';
	import { configuredServices } from '$lib/store';
	import type { ServiceCookie } from '$lib/types';
	import { get } from 'svelte/store';

	let cookies: ServiceCookie[] = [];

	onMount(() => {
		//Google Universal and Google 4 have some duplicate cookies. Code below removes those duplicates
		cookies = get(configuredServices).reduce((accumulator, service) => {
			let cookiesName = accumulator.map((cookie) => cookie.name);
			let serviceCookies = service.cookies.filter((cookie) => {
				return !cookiesName.includes(cookie.name);
			});
			return accumulator.concat(serviceCookies);
		}, []);
	});
</script>

{#if cookies.length}
	<table>
		<thead>
			<tr>
				<th> Name </th>
				<th> Provider </th>
				<th> Purpose </th>
				<th> Expiry </th>
				<th> Type </th>
			</tr>
		</thead>
		<tbody>
			{#each cookies as cookie}
				{#if cookie && cookie.name}
					<tr>
						<td> {cookie?.name} </td>
						<td
							><a href={cookie?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
								{cookie?.provider}</a
							>
						</td>
						<td> {cookie?.purpose} </td>
						<td> {cookie?.expiry} </td>
						<td> {cookie?.type} </td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
{/if}

<style type="text/scss">
</style>
