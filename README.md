<div align="center">
	<h1>Sveltekit Cookie Manager</h1>
	<p>Sveltekit Cookie Manager is an easy-use node package to help control the visitor's cookie consent.</p>
</div>

## Disclaimer

**SvelteKit Cookie Manager is currently in pre-alpha version and under development**

Minimum required SvelteKit version: `1.0.0-next.445`.

## About The Project

Sveltekit Cookie Manager reduces the workload of creating and mantaining multiple cookie consents by centralizing them into this package.
Enables cookie management of following services:

- Google Analytics Universal.
- Google Analytics 4.

### Features

- Display a customizable popup to accept or reject cookies. Pop up consists of:
  - Title, body, accept/reject buttons and a link to Privacy Policy page.
- Create a cookie library showing:
  - Tables with details about site's necessary cookies and additional cookies: cookie name, provider name and url, cookie category, purpose, expiry and type.
  - Radio inputs (allow or reject all cookies) and a button to update preferences.

### Built with

- Sveltekit.
- Typescript.

<br/>

## Installation

```
$ npm i @boxfish-studio/sveltekit-cookie-manager
```

or yarn

```
$ yarn add @boxfish-studio/sveltekit-cookie-manager
```

<br/>

## How to use

### Show popup

1. Import `CookieManager` component

```
import { CookieManager } from '@boxfish-studio/sveltekit-cookie-manager'
```

2. Add `CookieManager` to your svelte page passing a configuration variable with your desired settings as shown in example below:

```
<script lang='ts'>
	import type { SKCMConfiguration } from '@boxfish-studio/sveltekit-cookie-manager'

	const configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'This website uses cookies',
			body: 'By using this site, you agree with our use of cookies'
		},
		services: {
			googleAnalyticsUniversalId: 'UA-XXXXXXXX',
			googleAnalytics4Id: 'G-XXXXXXXX'
		},
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}
</script>

<CookieManager {configuration} />
```

### Show cookie library

1. Import `CookieLibrary` component

```
import { CookieLibrary } from '@boxfish-studio/sveltekit-cookie-manager'
```

2. Add `CookieLibrary` to your svelte file passing a configuration variable with desired settings as shown in the example below.<br/>
   You can use the library without any configuration or you can pass a `theme` to the configuration:

```
<script lang='ts'>
	import type { SKCMConfiguration } from '@boxfish-studio/sveltekit-cookie-manager'

    	const configuration: SKCMConfiguration = {
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
			medium: '#b0bfd9',
			light: '#fff'
		}
	}
</script>

<CookieLibrary {configuration} />
```

<br/>

## Available configuration

Custom configuration must be of type `SKCMConfiguration`. All available props are shown below:

```
SKCMConfiguration = {
	disclaimer: {
		title?: string
		body?: string
		policyText?: string
		policyUrl?: string
		acceptButtonText?: string
		rejectButtonText?: string
	}
	services: {
		googleAnalyticsUniversalId?: string
		googleAnalytics4Id?: string
		adCookiesEnabled?: boolean
		customNecessaryCookies?: {
			name: string
			provider: string
			providerUrl: string
			purpose: string
			expiry: string
			type: string
			showDisclaimerIfMissing?: boolean
		}[]
	}
	theme: {
		primary?: string
		dark?: string
		medium?: string
		light?: string
	}
}

```

### Popup props

`title`: The title of the popup. Default value: "Cookie Preferences".

`body`: By using this site, you agree with our use of cookies.".

`policyText`: Text that links to Privacy Policy. Default value: "Read our Cookie Policy".

`policyUrl`: Privacy Policy url.

`acceptButtonText`: Text shown in 'Accept' button. Default value: "Accept Additional Cookies".

`rejectButtonText`: Text shown in 'Reject' button. Default value: "Reject Additional Cookies".

### Services props

`googleAnalyticsUniversalId`: Your Google Analytics Universal key.

`googleAnalytics4Id`: Your Google Analytics 4 key.

`adCookiesEnabled`: Whether cookies with the category `Advertising` should be set in the browser and shown in the library.

`customNecessaryCookies`: Cookies that should be present in the `Necessary Cookies` table to inform the user their usage. To configure them see below.

### Custom Cookies

You can configure your own cookies to appear in the Cookie Library. You just have to add an array with your custom cookies to the Cookie Disclaimer.
It follows the configuration below:

`name`: The name of the Cookie.

`provider`: Provider's name.

`providerUrl`: An url to the provider's website.

`purpose`: The reason for the cookie usage.

`expiry`: Time that the cookie with remain in the user's browser since it's creation.

`type`: The type of the cookie.

`showDisclaimerIfMissing`: If set to true, the disclaimer will show up if the cookie name is not present in the visitors browser. This could be useful in a situation where you recently implemented a cookie in your website and want to show the disclaimer to your previous visitors. By default this is `false`.

### Theme props

A 4-colour palette has been predefined following a custom style guide. You may overwrite these values in your custom configuration variable.

`primary`: Used in buttons backgrounds, anchors. Default value: `#14cabf` (teal).

`dark`: Used in headings, body. Default value: `#131f37` (black).

`medium`: Used in table headings, table borders. Default value: `#b0bfd9` (gray).

`light`: Used in banner background colour, buttons text colour. Default value: `#fff` (white).

## Release Package

`npm run package && cd package && npm publish --access=public`

<hr/>

<div align="center">
	Made with :heart: by Boxfish Studio. </br></br>
	<img src="https://avatars.githubusercontent.com/u/36508409?s=200&v=4" alt="Boxfish Logo" width="50" height="50"/>
</div>
