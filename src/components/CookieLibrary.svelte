<script lang="ts">
	import { onMount } from 'svelte';
	import { configuredServices } from '$lib/store';
	import { get } from 'svelte/store';
	import { SupportedService } from '$lib/types';
	import { isServiceEnabled } from '$lib/utils';

	let allActiveCookies = [];

	onMount(() => {
		allActiveCookies = get(configuredServices)
			?.filter(function (service) {
				if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
					return service.type !== 'googleAnalytics4' && service.enabled;
				}
				return service.enabled;
			})
			.map(function (service) {
				return service.relatedCookies;
			});
	});
</script>

{#if allActiveCookies.length}
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
		{#each allActiveCookies as cookies}
			{#each cookies as cookie}
				<tbody>
					<tr>
						<td> {cookie.name} </td>
						<td
							><a href={cookie.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
								{cookie.provider}</a
							>
						</td>
						<td> {cookie.purpose} </td>
						<td> {cookie.expiry} </td>
						<td> {cookie.type} </td>
					</tr>
				</tbody>
			{/each}
		{/each}
	</table>
{/if}

<style type="text/scss">
	table {
		border: 1px solid #f2f5fb;
		border-bottom: none;
		text-align: left;
		thead {
			tr {
				th {
					padding: 1rem;
					font-size: 0.9rem;
					text-transform: uppercase;
					border-bottom: 1px solid #f2f5fb;
					color: #b2c1dc;
				}
			}
		}
		tbody {
			tr {
				td {
					padding: 1rem;
					font-size: 0.8rem;
					border-bottom: 1px solid #f2f5fb;

					&:first-child {
						font-weight: bold;
					}
					a {
						color: #0fc1b7;
						text-decoration: none;
					}
				}
			}
		}
	}
</style>
