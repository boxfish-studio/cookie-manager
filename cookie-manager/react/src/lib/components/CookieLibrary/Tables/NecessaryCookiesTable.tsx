import { useCookieManagerContext } from '@lib/app/context'

export function NecessaryCookiesTable(): React.JSX.Element {
	const { necessaryCookies } = useCookieManagerContext()
	return (
		<>
			{necessaryCookies.value?.length > 0 && (
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
						{necessaryCookies.value.map((cookie, index) => (
							<tr key={index}>
								<td> {cookie?.name}</td>
								<td> {cookie?.purpose} </td>
								<td> {cookie?.expiry} </td>
								<td> {cookie?.type} </td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	)
}
