import { Service } from './types'
import { GOOGLE_ANALYTICS_EXPIRATION_DAYS } from './constants'

export const loadGoogleAnalytics = (
	id: Service['id'],
	setServicesInitialized: (bool: boolean) => void
): void => {
	function gtag(_key: string, _value: unknown, _config?: { cookie_expires: number }) {
		// eslint-disable-next-line prefer-rest-params
		window.dataLayer.push(arguments)
	}
	window.dataLayer = window.dataLayer || []

	gtag('js', new Date())
	gtag('config', id, { cookie_expires: GOOGLE_ANALYTICS_EXPIRATION_DAYS * 24 * 60 * 60 })

	const script = document.createElement('script')
	script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
	document.body.appendChild(script)
	setServicesInitialized(true)
}

export const removeGoogleAnalytics = (id: Service['id']): void => {
	const scripts = Array.from(document.getElementsByTagName('script'))
	if (scripts && scripts.length) {
		scripts
			.find((script) => script?.src === `https://www.googletagmanager.com/gtag/js?id=${id}`)
			?.remove()
		scripts
			.find((script) => script?.src === 'https://www.google-analytics.com/analytics.js')
			?.remove()
	}
}

export const updatePathGA = (id: Service['id'], path: string): void => {
	function gtag(_key: string, _value: unknown, _pagePathObject: { page_path: string }) {
		// eslint-disable-next-line prefer-rest-params
		window.dataLayer.push(arguments)
	}
	window.dataLayer = window.dataLayer || []
	gtag('config', id, {
		page_path: path
	})
}
