import { useCookieManagerContext } from './context'
import { SupportedService } from '@core/enums'
import { updatePathGA } from '@core/clientSideOnly'

interface UseUpdatePathGAProps {
	googleAnalyticsUniversalId?: string
	googleAnalytics4Id?: string
}

export function useUpdatePathGA(forceConfig?: UseUpdatePathGAProps): (pathname: string) => void {
	const { googleAnalyticsUniversalId, googleAnalytics4Id } = forceConfig ?? {}
	const { configuredServices } = useCookieManagerContext()

	const currentService = configuredServices.find(({ enabled }) => enabled)

	function isServiceEnabled(service: SupportedService): boolean {
		return configuredServices.find(({ type }) => type === service)?.enabled ?? false
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
