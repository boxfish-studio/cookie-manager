<script lang="ts">
	import { CookieLibrary } from '$components'
	import type { SKCMConfiguration } from '$core/types'

	export const prerender = true

	const configuration: SKCMConfiguration = {
		theme: {
			light: '#fff',
			dark: '#131f37',
			medium: '#b0bfd9',
			primary: '#14cabf'
		}
	}
</script>

<h1>Policy</h1>

<CookieLibrary {configuration} />
