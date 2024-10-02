import { SKCMConfiguration } from '@core/types'

interface CookieLibraryProps {
	configuration: SKCMConfiguration
}

export function CookieLibrary({ configuration }: CookieLibraryProps): React.JSX.Element {
	return (
		<div>
			<h1>Library</h1>
		</div>
	)
}
