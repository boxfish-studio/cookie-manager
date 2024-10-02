import { useEffect } from 'react'
import type { Service, ServiceCookie, SKCMConfiguration } from '@core/types'
import { Disclaimer } from '..'
import { useCookieManagerContext } from '@lib/app/context'
import {
	hasAllNeededNecessaryCookies,
	initConfiguredServices,
	submitNecessaryCookies
} from '@core/services'
import { useManageServices } from '@lib/app/hooks'

interface CookieManagerProps {
	configuration: SKCMConfiguration
}

export function CookieManager({ configuration }: CookieManagerProps): React.JSX.Element {
	const {
		setConfiguredServices,
		setNecessaryCookies,
		necessaryCookies,
		configuredServices,
		showCookieDisclaimer,
		setShowCookieDisclaimer
	} = useCookieManagerContext()
	const { initializeServices } = useManageServices()

	const {
		googleAnalyticsUniversalId,
		googleAnalytics4Id,
		customNecessaryCookies,
		adCookiesEnabled
	} = configuration?.services ?? {}

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log('CookieManager: useEffect')
		function onServicesInitialized(services: Service[], cookies: ServiceCookie[]): void {
			setConfiguredServices(services)
			setNecessaryCookies(cookies)
		}
		initConfiguredServices({
			googleAnalyticsUniversalId,
			googleAnalytics4Id,
			customNecessaryCookies,
			adCookiesEnabled,
			onServicesInitialized
		})

		const canInitializeServices = hasAllNeededNecessaryCookies(necessaryCookies)

		if (canInitializeServices) {
			initializeServices()
		} else {
			setShowCookieDisclaimer(true)
		}
		// eslint-disable-next-line no-console
		console.log('CookieManager: useEffect end', { canInitializeServices, showCookieDisclaimer })
	}, [necessaryCookies])

	const handleSubmitNecessaryCookies = (value: 'true' | 'false') => {
		submitNecessaryCookies(value, configuredServices, necessaryCookies, setConfiguredServices)
		if (value === 'true') {
			initializeServices()
		}
		setShowCookieDisclaimer(false)
	}

	const allowCookies = () => {
		handleSubmitNecessaryCookies('true')
	}

	const declineCookies = () => {
		handleSubmitNecessaryCookies('false')
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
