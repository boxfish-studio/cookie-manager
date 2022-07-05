<script lang="ts">
	import { additionalCookies } from '$lib/app/store'
</script>

{#if $additionalCookies?.length}
	<table id="skcm-additional-cookies-table">
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
			{#each $additionalCookies as cookie}
				<tr>
					<td> {cookie?.name} </td>
					<td>
						<a href={cookie?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
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
