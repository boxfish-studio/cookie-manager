import { useEffect } from 'react'
import type { SKCMConfiguration } from '@core/types'
import { useCookieManagerContext } from '@lib/app/context'
import {
	checkAllRequiredCookies,
	initializeConfiguredServices,
	initializeGoogleAnalytics
} from '@core/services'
import { Disclaimer } from '..'
import { useSubmitNecessaryCookies } from '@lib/app'

interface CookieManagerProps {
	configuration: SKCMConfiguration
	onAcceptCookies?: () => void
	onDeclineCookies?: () => void
}

export function CookieManager({
	configuration,
	onAcceptCookies,
	onDeclineCookies
}: CookieManagerProps): React.JSX.Element {
	const {
		servicesInitialized,
		setServicesInitialized,
		showCookieDisclaimer,
		setShowCookieDisclaimer,
		setConfiguredServices,
		setNecessaryCookies
	} = useCookieManagerContext()
	const submitNecessaryCookies = useSubmitNecessaryCookies()

	useEffect(() => {
		const { configuredServices: services, necessaryCookies: cookies } =
			initializeConfiguredServices(configuration?.services)

		setConfiguredServices(services)
		setNecessaryCookies(cookies)

		const hasAllRequiredCookies = checkAllRequiredCookies(cookies)
		if (hasAllRequiredCookies) {
			initializeGoogleAnalytics(servicesInitialized, services, setServicesInitialized)
		} else {
			setShowCookieDisclaimer(true)
		}
	}, [])

	function allowCookies(): void {
		onAcceptCookies?.()
		submitNecessaryCookies('true')
	}

	function declineCookies(): void {
		onDeclineCookies?.()
		submitNecessaryCookies('false')
	}

	return (
		<>
			{showCookieDisclaimer && (
				<Disclaimer
					allowCookies={allowCookies}
					declineCookies={declineCookies}
					configuration={configuration?.disclaimer}
					theme={configuration?.theme}
				/>
			)}
		</>
	)
}

export default CookieManager
