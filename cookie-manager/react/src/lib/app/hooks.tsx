import { initializeServices, clearAdditionalCookies, stopCoreServices } from '@core/services'
import { useCookieManagerContext } from './context'
import { SupportedService } from '@core/enums'
import { updatePathGA } from '@core/clientSideOnly'
import { useCallback } from 'react'

export function useManageServices(): {
	initializeServices: () => void
	stopServices: () => void
	removeUnnecessaryCookies: () => void
} {
	const { servicesInitialized, configuredServices, necessaryCookies } = useCookieManagerContext()

	const removeUnnecessaryCookies = useCallback(() => {
		clearAdditionalCookies(necessaryCookies.value)
	}, [necessaryCookies])

	const initServices = useCallback(() => {
		initializeServices(
			servicesInitialized.value,
			configuredServices.value,
			servicesInitialized.setValue
		)
	}, [necessaryCookies, configuredServices])

	const stopServices = useCallback(() => {
		stopCoreServices(
			configuredServices.value,
			removeUnnecessaryCookies,
			servicesInitialized.setValue
		)
	}, [configuredServices, necessaryCookies])

	return { initializeServices: initServices, stopServices, removeUnnecessaryCookies }
}

interface UseUpdatePathGAProps {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
}

export function useUpdatePathGA(forceConfig?: UseUpdatePathGAProps): (pathname: string) => void {
	const { googleAnalyticsUniversalId, googleAnalytics4Id } = forceConfig ?? {}
	const { configuredServices } = useCookieManagerContext()

	const currentService = configuredServices.value.find(({ enabled }) => enabled)

	function isServiceEnabled(service: SupportedService): boolean {
		return configuredServices.value.find(({ type }) => type === service)?.enabled ?? false
	}

	return (pathname: string) => {
		if (pathname) {
			if (!googleAnalytics4Id && !googleAnalyticsUniversalId && currentService) {
				updatePathGA(currentService.id, pathname)
			} else {
				if (
					googleAnalyticsUniversalId &&
					isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)
				) {
					updatePathGA(googleAnalyticsUniversalId, pathname)
				} else if (googleAnalytics4Id && isServiceEnabled(SupportedService.GoogleAnalytics4)) {
					updatePathGA(googleAnalytics4Id, pathname)
				}
			}
		}
	}
}
