<script lang="ts">
	import { NECESSARY_COOKIES } from '$lib/app/cookieLib';
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
			{#each Object.values(NECESSARY_COOKIES) as cookie}
				<tr>
					<td> {cookie?.name}</td>
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

<style type="text/scss">
</style>
