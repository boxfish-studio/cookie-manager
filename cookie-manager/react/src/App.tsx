import { CookieManager, CookieLibrary } from '@components'
import { SKCMConfiguration } from '@core/types'
import { useEffect } from 'react'

function App(): React.JSX.Element {
	useEffect(() => {
		document.cookie.split(';').forEach((c) => {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
		})
	}, [])
	const configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalytics4Id: 'G-XXXXXXXXXX',
			customNecessaryCookies: [
				{
					name: 'AMP_njdsaknjdsak',
					purpose: 'Amplitude Analytics - necessary for basic website functionality',
					expiry: '1 year',
					type: 'http',
					showDisclaimerIfMissing: true
				}
			]
		}
	}

	return (
		<>
			<CookieManager
				configuration={configuration}
				onAcceptCookies={() => {
					setTimeout(() => {
						// console.log('Cookie set!')
					}, 1000)
				}}
				onDeclineCookies={() => {
					setTimeout(() => {
						// console.log('Cookie NOT SET!')
					}, 1000)
				}}
			/>

			<CookieLibrary
				configuration={configuration}
				onAcceptCookies={() => {
					setTimeout(() => {
						// console.log('Cookie set!')
					}, 1000)
				}}
				onDeclineCookies={() => {
					setTimeout(() => {
						// console.log('Cookie NOT SET!')
					}, 1000)
				}}
			/>
		</>
	)
}

export default App
