<script lang="ts">
	import { NECESSARY_COOKIES } from '$lib/app/cookieLib'
</script>

{#if NECESSARY_COOKIES}
	<table id="skcm-necessary-table">
		<thead id="skcm-table__thead">
			<tr id="skcm-table__tr">
				<th id="skcm-table__th"> Name </th>
				<th id="skcm-table__th"> Provider </th>
				<th id="skcm-table__th"> Purpose </th>
				<th id="skcm-table__th"> Expiry </th>
				<th id="skcm-table__th"> Type </th>
			</tr>
		</thead>
		<tbody id="skcm-table__tbody">
			{#each Object.values(NECESSARY_COOKIES) as cookie}
				<tr id="skcm-table__tr">
					<td id="skcm-table__td"> {cookie?.name}</td>
					<td id="skcm-table__td"
						><a  id="skcm-table__td--link"href={cookie?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
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
