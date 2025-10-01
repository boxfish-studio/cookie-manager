import type { SKCMConfiguration } from '@core/types'
import { information } from '@core/cookies.json'
import { AdditionalCookiesTable, Button, NecessaryCookiesTable } from '..'
import { useCookieManagerContext } from '@lib/app/context'
import {
	updateBrowserCookies as updateNecessaryCookies,
	stopCoreServices,
	clearAdditionalCookies,
	initializeGoogleAnalytics
} from '@core/services'
import { useState } from 'react'
import { parseThemeColors } from '@lib/app/parseStyles'
import './CookieLibrary.css'

interface CookieLibraryProps {
	configuration: SKCMConfiguration
	onAcceptCookies?: () => void
	onDeclineCookies?: () => void
}
export function CookieLibrary({
	configuration,
	onAcceptCookies,
	onDeclineCookies
}: CookieLibraryProps): React.JSX.Element {
	const {
		servicesInitialized,
		configuredServices,
		necessaryCookies,
		setShowCookieDisclaimer,
		setConfiguredServices,
		setServicesInitialized
	} = useCookieManagerContext()
	const [hasAllowedCookies, setHasAllowedCookies] = useState<'true' | 'false'>('false')

	const themeStyles = parseThemeColors(configuration.theme)

	function updatePreferences(): void {
		if (hasAllowedCookies !== undefined) {
			updateNecessaryCookies(hasAllowedCookies, necessaryCookies)

			const updatedServices = configuredServices.map((service) => ({
				...service,
				enabled: hasAllowedCookies === 'true'
			}))
			setConfiguredServices(updatedServices)

			if (hasAllowedCookies === 'true') {
				onAcceptCookies?.()
				initializeGoogleAnalytics(servicesInitialized, updatedServices, setServicesInitialized)
			} else {
				onDeclineCookies?.()
				stopCoreServices(
					updatedServices,
					() => clearAdditionalCookies(necessaryCookies),
					setServicesInitialized
				)
			}
			setShowCookieDisclaimer(false)
		}
	}

	function handleOptionChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setHasAllowedCookies(event.target.value as 'true' | 'false')
	}

	return (
		<>
			<div id="skcm-cookie-library" style={themeStyles}>
				{information.map((section, sectionKey) => (
					<section id={`skcm-cookie-library__${section?.id}`} key={sectionKey}>
						{section?.title && <h4>{section?.title}</h4>}
						{section?.body &&
							section?.body.map((paragraphs, key) => <p key={key}>{paragraphs?.paragraph}</p>)}

						{section?.id === 'necessary-cookies' ? (
							<NecessaryCookiesTable />
						) : section?.id === 'additional-cookies' ? (
							<AdditionalCookiesTable />
						) : null}
					</section>
				))}

				<div id="skcm-cookie-library__preferences">
					<label id="skcm-cookie-library__preferences--reject">
						<input
							type="radio"
							value="false"
							onChange={handleOptionChange}
							checked={hasAllowedCookies === 'false'}
						/>
						Reject all
					</label>
					<label id="skcm-cookie-library__preferences--allow">
						<input
							type="radio"
							value="true"
							onChange={handleOptionChange}
							checked={hasAllowedCookies === 'true'}
						/>
						Allow all
					</label>
					<Button
						onClick={updatePreferences}
						id="skcm-cookie-library__preferences__button"
						disabled={!hasAllowedCookies}
					>
						Update Cookie Preference
					</Button>
				</div>
			</div>
		</>
	)
}
