<script lang="ts">
	import { onMount } from 'svelte';
	import { configuredServices } from '$lib/store';
	import { get } from 'svelte/store';
	import { SupportedService } from '$lib/types';
	import { isServiceEnabled } from '$lib/utils';

	let enabledCookies: Array<object> = [];
	onMount(() => {
		enabledCookies = get(configuredServices)
			?.filter(function (service) {
				if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
					return service.type !== 'googleAnalytics4' && service.enabled;
				}
				return service.enabled;
			})
			.map(function (service) {
				return service.cookies;
			});
	});
</script>

{#if enabledCookies.length}
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
		{#each enabledCookies as providerCookies}
			{#each providerCookies as cookie}
				<tbody>
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
				</tbody>
			{/each}
		{/each}
	</table>
{/if}

<style type="text/scss">
</style>
