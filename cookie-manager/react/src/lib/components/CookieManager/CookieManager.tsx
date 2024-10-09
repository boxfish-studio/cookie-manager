import { useEffect } from 'react'
import type { Service, ServiceCookie, SKCMConfiguration } from '@core/types'
import { useCookieManagerContext } from '@lib/app/context'
import {
	checkAllRequiredCookies,
	initializeConfiguredServices,
	setNecessaryCookies
} from '@core/services'
import { useManageServices } from '@lib/app/hooks'
import { Disclaimer } from '..'

interface CookieManagerProps {
	configuration: SKCMConfiguration
}

export function CookieManager({ configuration }: CookieManagerProps): React.JSX.Element {
	const { necessaryCookies, configuredServices, showCookieDisclaimer } = useCookieManagerContext()
	const { initializeServices } = useManageServices()

	useEffect(() => {
		initializeConfiguredServices({
			services: configuration?.services,
			onConfiguredServicesInitialized
		})

		function onConfiguredServicesInitialized(services: Service[], cookies: ServiceCookie[]): void {
			configuredServices.setValue(services)
			necessaryCookies.setValue(cookies)
		}
	}, [])

	useEffect(() => {
		const canInitializeServices = checkAllRequiredCookies(necessaryCookies.value)
		if (canInitializeServices) {
			initializeServices()
		} else {
			showCookieDisclaimer.setValue(true)
		}
	}, [necessaryCookies.value])

	function handleSubmitNecessaryCookies(value: 'true' | 'false'): void {
		setNecessaryCookies(
			value,
			configuredServices.value,
			necessaryCookies.value,
			configuredServices.setValue
		)
		if (value === 'true') {
			initializeServices()
		}
		showCookieDisclaimer.setValue(false)
	}

	function allowCookies(): void {
		handleSubmitNecessaryCookies('true')
	}

	function declineCookies(): void {
		handleSubmitNecessaryCookies('false')
	}

	return (
		<>
			{showCookieDisclaimer.value && (
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
