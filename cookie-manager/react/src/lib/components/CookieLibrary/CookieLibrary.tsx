import type { SKCMConfiguration } from '@core/types'
import { information } from '@core/cookies.json'
import { AdditionalCookiesTable, Button, NecessaryCookiesTable } from '..'
import { useManageServices } from '@lib/app/hooks'
import { useCookieManagerContext } from '@lib/app/context'
import { submitNecessaryCookies } from '@core/services'
import { useState } from 'react'
import './CookieLibrary.css'

interface CookieLibraryProps {
	configuration: SKCMConfiguration
}
export function CookieLibrary(_: CookieLibraryProps): React.JSX.Element {
	const { configuredServices, necessaryCookies, setConfiguredServices, setShowCookieDisclaimer } =
		useCookieManagerContext()
	const { initializeServices, stopServices } = useManageServices()

	const [hasAllowedCookies, setHasAllowedCookies] = useState<'true' | 'false'>('false')

	function updatePreferences(): void {
		if (hasAllowedCookies !== undefined) {
			submitNecessaryCookies(
				hasAllowedCookies,
				configuredServices,
				necessaryCookies,
				setConfiguredServices
			)
			hasAllowedCookies === 'true' ? initializeServices() : stopServices()
			setShowCookieDisclaimer(false)
		}
	}

	function handleOptionChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setHasAllowedCookies(event.target.value as 'true' | 'false')
	}

	return (
		<>
			<div id="skcm-cookie-library">
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
