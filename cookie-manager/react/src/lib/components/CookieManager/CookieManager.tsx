import { useEffect } from 'react'
import type { Service, ServiceCookie, SKCMConfiguration } from '@core/types'
import { useCookieManagerContext } from '@lib/app/context'
import {
	checkAllRequiredCookies,
	initializeConfiguredServices,
	setNecessaryCookies as setNecessaryCookiesService
} from '@core/services'
import { useManageServices } from '@lib/app/hooks'
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
		necessaryCookies,
		configuredServices,
		showCookieDisclaimer,
		setShowCookieDisclaimer,
		setConfiguredServices,
		setNecessaryCookies
	} = useCookieManagerContext()
	const { initializeServices } = useManageServices()

	useEffect(() => {
		initializeConfiguredServices({
			services: configuration?.services,
			onConfiguredServicesInitialized
		})

		function onConfiguredServicesInitialized(services: Service[], cookies: ServiceCookie[]): void {
			setConfiguredServices(services)
			setNecessaryCookies(cookies)
		}
	}, [])

	useEffect(() => {
		const canInitializeServices = checkAllRequiredCookies(necessaryCookies)
		if (canInitializeServices) {
			initializeServices()
		} else {
			setShowCookieDisclaimer(true)
		}
	}, [necessaryCookies, initializeServices])

	function handleSubmitNecessaryCookies(value: 'true' | 'false'): void {
		if (necessaryCookies.some((element) => SKCM_GOOGLE_NECESSARY_COOKIES.includes(element.name))) {
			setNecessaryCookiesService(value, configuredServices, necessaryCookies, setConfiguredServices)
			if (value === 'true') {
				initializeServices()
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
