import { useEffect } from 'react'
import type { Service, ServiceCookie, SKCMConfiguration } from '@core/types'
import { useCookieManagerContext } from '@lib/app/context'
import {
	checkAllRequiredCookies,
	initializeConfiguredServices,
	initializeGoogleAnalytics,
	updateBrowserCookies
} from '@core/services'
import { Disclaimer } from '..'
import {
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE,
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE
} from '@core/cookieLib'

const SKCM_GOOGLE_NECESSARY_COOKIES: string[] = [
	SKCM_GA_GOOGLE_ANALYTICS_UNIVERSAL_COOKIE?.name,
	SKCM_GA_GOOGLE_ANALYTICS_4_COOKIE?.name
]

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
		necessaryCookies,
		configuredServices,
		showCookieDisclaimer,
		setShowCookieDisclaimer,
		setConfiguredServices,
		setNecessaryCookies
	} = useCookieManagerContext()

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

	function handleSubmitNecessaryCookies(value: 'true' | 'false'): void {
		if (necessaryCookies.some((element) => SKCM_GOOGLE_NECESSARY_COOKIES.includes(element.name))) {
			updateBrowserCookies(value, necessaryCookies)

			const updatedServices = configuredServices.map((service) => ({
				...service,
				enabled: value === 'true'
			}))
			setConfiguredServices(updatedServices)

			if (value === 'true') {
				initializeGoogleAnalytics(servicesInitialized, updatedServices, setServicesInitialized)
			}
		}

		setShowCookieDisclaimer(false)
	}

	function allowCookies(): void {
		onAcceptCookies?.()
		handleSubmitNecessaryCookies('true')
	}

	function declineCookies(): void {
		onDeclineCookies?.()
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
