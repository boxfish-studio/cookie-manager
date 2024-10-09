import { DEFAULT_THEME_COLORS } from '@core/constants'
import { Theme } from '@core/types'

export function parseThemeColors(theme: Theme | undefined): React.CSSProperties {
	const mergedTheme = { ...DEFAULT_THEME_COLORS, ...theme }
	return formatStyles(mergedTheme)
}

export function formatStyles(styles: Theme | undefined): React.CSSProperties {
	const cssVariables: Record<string, string> = {}

	if (!styles) {
		return cssVariables
	}

	const keys = Object.keys(styles) as (keyof Theme)[]

	keys.forEach((key) => {
		const cssVarName = `--${key}`
		const value = styles[key]
		if (value) {
			cssVariables[cssVarName] = value
		}
	})

	return cssVariables
}
