import { useCookieManagerContext } from '@lib/app/context'

export function AdditionalCookiesTable(): React.JSX.Element {
	const { additionalCookies } = useCookieManagerContext()
	return (
		<>
			{additionalCookies.value?.length > 0 && (
				<table id="skcm-additional-cookies-table">
					<thead>
						<tr>
							<th> Name </th>
							<th> Provider </th>
							<th> Category </th>
							<th> Purpose </th>
							<th> Expiry </th>
							<th> Type </th>
						</tr>
					</thead>
					<tbody>
						{additionalCookies.value.map((cookie, index) => (
							<tr key={index}>
								<td> {cookie?.name} </td>
								<td>
									<a href={cookie?.providerUrl} target="_blank" rel="noopener noreferrer nofollow">
										{cookie?.provider}
									</a>
								</td>
								<td> {cookie?.category} </td>
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
