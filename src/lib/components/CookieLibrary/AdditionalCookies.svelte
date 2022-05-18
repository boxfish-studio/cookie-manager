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
	<table id="skcm-additional-table">
		<thead id="skcm-table__thead">
			<tr id="skcm-table__tr">
				<th id="skcm-table__th"> Name </th>
				<th id="skcm-table__th"> Provider </th>
				<th id="skcm-table__th"> Purpose </th>
				<th id="skcm-table__th"> Expiry </th>
				<th id="skcm-table__th"> Type </th>
			</tr>
		</thead>
		<tbody id="skcm-table__body">
			{#each cookies as cookie}
				<tr id="skcm-table__tr">
					<td id="skcm-table__td"> {cookie?.name} </td>
					<td id="skcm-table__td">
						<a id="skcm-table__td--link"
						 href={cookie?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
							{cookie?.provider}</a
						>
					</td>
					<td id="skcm-table__td"> {cookie?.purpose} </td>
					<td id="skcm-table__td"> {cookie?.expiry} </td>
					<td id="skcm-table__td"> {cookie?.type} </td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
