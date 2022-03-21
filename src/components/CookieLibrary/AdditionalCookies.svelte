<script lang="ts">
	import { onMount } from 'svelte';
	import { configuredServices } from '$lib/store';
	import { get } from 'svelte/store';

	let cookiesByService: Array<object> = [];
	let filteredCookies: Array<object> = [];
	onMount(() => {
		cookiesByService = get(configuredServices).map((service) => service.cookies);
		filteredCookies = get(configuredServices).map((service, serviceIndex) => {
			if (serviceIndex != 0) {
				service.cookies.map((cookie, cookieIndex) => {
					removeDuplicates(cookie.name, serviceIndex, cookieIndex);
				});
			}
		});

		function removeDuplicates(cookie, serviceIndex, cookieIndex) {
			cookiesByService.forEach(function (item, index) {
				item.forEach(function (i, index2) {
					if (i.name === cookie && (index !== serviceIndex || index2 !== cookieIndex)) {
						cookiesByService[serviceIndex][cookieIndex] = '';
					}
				});
			});
		}
	});
</script>

{#if cookiesByService.length}
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
			{#each cookiesByService as cookies}
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
			{/each}
		</tbody>
	</table>
{/if}

<style type="text/scss">
</style>
