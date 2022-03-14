<script lang="ts">
	import { NECESSARY_COOKIES } from '$lib/cookieLib';
</script>

{#if NECESSARY_COOKIES}
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
			{#each Object.entries(NECESSARY_COOKIES) as [cookie, details]}
				<tr>
					<td> {details?.name}</td>
					<td
						><a href={details?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
							{details?.provider}</a
						>
					</td>
					<td> {details?.purpose} </td>
					<td> {details?.expiry} </td>
					<td> {details?.type} </td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style type="text/scss">
</style>
