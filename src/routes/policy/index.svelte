<script context="module" lang="ts">
	import { CookieLibrary } from '$components';
	import type { StylesConfiguration } from '$lib/types';
	export const prerender = true;
	let styles: StylesConfiguration = {
		primary: '#14cabf',
		light: '#fff',
		medium: '#b0bfd9',
		dark: '#131f37'
	};
</script>

<h1>Policy</h1>

<CookieLibrary {styles} />
