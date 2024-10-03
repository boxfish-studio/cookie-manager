import { DEFAULT_DISCLAIMER_CONFIG } from '@core/constants'
import type { DisclaimerConfiguration, Theme } from '@core/types'
import { Button } from '..'
import { parseThemeColors } from '@lib/app/parseStyles'
import './Disclaimer.css'

interface DisclaimerProps {
	configuration?: DisclaimerConfiguration
	theme?: Theme
	allowCookies: () => void
	declineCookies: () => void
}

export function Disclaimer({
	configuration = {},
	theme,
	allowCookies,
	declineCookies
}: DisclaimerProps): React.JSX.Element {
	const { title, body, policyUrl, policyText, acceptButtonText, rejectButtonText } = {
		...DEFAULT_DISCLAIMER_CONFIG,
		...configuration
	}
	const styles = parseThemeColors(theme)

	return (
		<div id="skcm-cookie-disclaimer" style={styles}>
			<div id="skcm-cookie-disclaimer__body">
				{title && <h6 id="skcm-title">{title}</h6>}
				<p id="skcm-body">
					{body}
					<a href={policyUrl} target="_blank" rel="noopener noreferrer">
						<span id="skcm-link__span">{policyText}</span>
					</a>
				</p>
			</div>
			<div id="skcm-cookie-disclaimer__buttons">
				<Button onClick={allowCookies} id="skcm-cookie-disclaimer__buttons--allow">
					{acceptButtonText}
				</Button>
				<Button onClick={declineCookies} id="skcm-cookie-disclaimer__buttons--reject">
					{rejectButtonText}
				</Button>
			</div>
		</div>
	)
}
