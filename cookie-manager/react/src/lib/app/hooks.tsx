import {
	initializeServices as initServices,
	removeAdditionalCookies,
	stopServices as removeServices
} from '@core/services'
import { useCookieManagerContext } from './context'
import { useCallback } from 'react'
import { SupportedService } from '@core/enums'
import { updatePathGA } from '@core/clientSideOnly'

interface UseManageServices {
	initializeServices: () => void
	stopServices: () => void
	isServiceEnabled: (service: SupportedService) => boolean
}

export function useManageServices(): UseManageServices {
	const {
		servicesInitialized,
		setServicesInitialized,
		configuredServices,
		removeUnnecessaryCookies
	} = useCookieManagerContext()

	const initializeServices = useCallback(() => {
		initServices(servicesInitialized, configuredServices, setServicesInitialized)
	}, [servicesInitialized, configuredServices, setServicesInitialized])

	const stopServices = useCallback(() => {
		removeServices(configuredServices, removeUnnecessaryCookies, setServicesInitialized)
	}, [configuredServices, removeUnnecessaryCookies, setServicesInitialized])

	const isServiceEnabled = useCallback(
		(service: SupportedService) =>
			configuredServices.find(({ type }) => type === service)?.enabled ?? false,
		[configuredServices]
	)

	return { initializeServices, stopServices, isServiceEnabled }
}

interface UseUpdatePathGAProps {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
}

export function useUpdatePathGA({
	googleAnalyticsUniversalId,
	googleAnalytics4Id
}: UseUpdatePathGAProps): (pathname: string) => void {
	const { isServiceEnabled } = useManageServices()

	const cb = useCallback(
		(pathname: string) => {
			if (pathname) {
				if (isServiceEnabled(SupportedService.GoogleAnalyticsUniversal)) {
					updatePathGA(googleAnalyticsUniversalId, pathname)
				} else if (isServiceEnabled(SupportedService.GoogleAnalytics4)) {
					updatePathGA(googleAnalytics4Id, pathname)
				}
			}
		},
		[googleAnalytics4Id, googleAnalyticsUniversalId]
	)
	return cb
}

export function useRemoveNecessaryCookies(): () => void {
	const { necessaryCookies } = useCookieManagerContext()

	const cb = useCallback(() => {
		removeAdditionalCookies(necessaryCookies)
	}, [necessaryCookies])

	return cb
}
