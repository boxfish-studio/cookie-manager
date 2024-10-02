// import { useEffect, useState } from 'react'
import { DEFAULT_DISCLAIMER_CONFIG } from '@core/constants'
import type { DisclaimerConfiguration, Theme } from '@core/types'
// import { getInlineStyle } from '@core/utils'
import { Button } from '..'
import './Disclaimer.css'

interface DisclaimerProps {
	configuration?: DisclaimerConfiguration
	theme?: Theme
	allowCookies: () => void
	declineCookies: () => void
}

export function Disclaimer({
	configuration = {},
	allowCookies,
	declineCookies
}: DisclaimerProps): React.JSX.Element {
	// const [style, setStyle] = useState<string>('')
	const { title, body, policyUrl, policyText, acceptButtonText, rejectButtonText } = {
		...DEFAULT_DISCLAIMER_CONFIG,
		...configuration
	}

	// useEffect(() => {
	// 	setStyle(getInlineStyle(theme))
	// }, [theme])

	return (
		<div id="skcm-cookie-disclaimer">
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
