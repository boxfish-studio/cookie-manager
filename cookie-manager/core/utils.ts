import { DEFAULT_THEME_COLORS } from './constants'
import type { Theme } from './types'

/*
 * General utils for managing cookies in Typescript.
 * Source: https://gist.github.com/joduplessis/7b3b4340353760e945f972a69e855d11
 */
export function getCookie(name: string): string | undefined {
	const value = '; ' + document.cookie
	const parts = value.split('; ' + name + '=')

	if (parts?.length == 2) {
		return parts?.pop()?.split(';')?.shift() ?? undefined
	}
}
export const setCookie = (name: string, val: string, expDays: number): void => {
	const date = new Date()
	const value = val
	date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
	document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/'
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function deleteCookie(name: string) {
	const date = new Date()
	date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000)
	document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/'
}

export const formatStyles = (theme: Theme): string =>
	Object.entries(theme)
		.map((colorVariable) => `--${colorVariable[0]}:${colorVariable[1]};`)
		.join(' ')

export const getInlineStyle = (theme: Theme = {}): string => {
	const mergedTheme = { ...DEFAULT_THEME_COLORS, ...theme }
	return formatStyles(mergedTheme)
}
