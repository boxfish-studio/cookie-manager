import { CookieManager, CookieLibrary } from '@components'
import { SKCMConfiguration } from '@core/types'

function App(): React.JSX.Element {
	const configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-XXXXXXXXX',
			googleAnalytics4Id: 'G-XXXXXXX',
			adCookiesEnabled: true,
			customNecessaryCookies: [
				{
					name: '1st Cookie Test',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s preferences.',
					expiry: '2 months',
					type: 'HTTP',
					showDisclaimerIfMissing: true
				},
				{
					name: 'Cookie 2',
					provider: 'Boxfish',
					providerUrl: 'boxfish.studio',
					purpose: 'Stores the user´s cookies consent state for the current domain',
					expiry: '30 days',
					type: 'HTTP',
					showDisclaimerIfMissing: true
				}
			]
		}
	}
	return (
		<>
			<CookieManager configuration={configuration} />
			<CookieLibrary configuration={configuration} />
		</>
	)
}

export default App
