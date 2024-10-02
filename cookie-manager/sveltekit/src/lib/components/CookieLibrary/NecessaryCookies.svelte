<script lang="ts">
	import { necessaryCookies } from '$lib/app/store'
</script>

{#if $necessaryCookies?.length}
	<table id="skcm-necessary-cookies-table">
		<thead>
			<tr>
				<th> Name </th>
				<th> Purpose </th>
				<th> Expiry </th>
				<th> Type </th>
			</tr>
		</thead>
		<tbody>
			{#each $necessaryCookies as cookie}
				<tr>
					<td> {cookie?.name}</td>
					<td> {cookie?.purpose} </td>
					<td> {cookie?.expiry} </td>
					<td> {cookie?.type} </td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
