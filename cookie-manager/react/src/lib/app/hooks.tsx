import {
	initializeServices as initServices,
	removeAdditionalCookies,
	stopServices as removeServices
} from '@core/services'
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
		removeAdditionalCookies(necessaryCookies.value)
	}, [necessaryCookies])

	const initializeServices = useCallback(() => {
		initServices(servicesInitialized.value, configuredServices.value, servicesInitialized.setValue)
	}, [necessaryCookies, configuredServices])

	const stopServices = useCallback(() => {
		removeServices(configuredServices.value, removeUnnecessaryCookies, servicesInitialized.setValue)
	}, [configuredServices, necessaryCookies])

	return { initializeServices, stopServices, removeUnnecessaryCookies }
}

interface UseUpdatePathGAProps {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
}

export function useUpdatePathGA({
	googleAnalyticsUniversalId,
	googleAnalytics4Id
}: UseUpdatePathGAProps): (pathname: string) => void {
	const { configuredServices } = useCookieManagerContext()

	function isServiceEnabled(service: SupportedService): boolean {
		return configuredServices.value.find(({ type }) => type === service)?.enabled ?? false
	}

	return (pathname: string) => {
		if (pathname) {
			if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
				updatePathGA(googleAnalyticsUniversalId, pathname)
			} else if (isServiceEnabled(SupportedService.GoogleAnalytics4)) {
				updatePathGA(googleAnalytics4Id, pathname)
			}
		}
	}
}
