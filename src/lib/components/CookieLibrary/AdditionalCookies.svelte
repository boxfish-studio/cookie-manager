<script lang="ts">
	import { configuredServices } from '$lib/app/store'
	import type { ServiceCookie } from '$lib/app/types'

	let cookies: ServiceCookie[] = []

	//Google Universal and Google 4 have some duplicate cookies. Code below removes those duplicates
	$: cookies = $configuredServices.reduce((accumulator, service) => {
		let cookiesName = accumulator.map((cookie) => cookie.name)
		let serviceCookies = service.cookies.filter((cookie) => {
			return !cookiesName.includes(cookie.name)
		})
		return accumulator.concat(serviceCookies)
	}, [])
</script>

{#if cookies.length}
	<table id="skcl-table">
		<thead  id="skcl-thead">
			<tr>
				<th> Name </th>
				<th> Provider </th>
				<th> Purpose </th>
				<th> Expiry </th>
				<th> Type </th>
			</tr>
		</thead>
		<tbody id="skcl-tbody">
			{#each cookies as cookie}
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
			{/each}
		</tbody>
	</table>
{/if}
