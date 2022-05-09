# Sveltekit Cookie Manager
<br/>

## About The Project

Sveltekit Cookie Manager reduces the workload of creating and mantaining multiple cookie consents by centralizing them into this package. 
Enables cookie management of following services:
- Google Analytics Universal.
- Google Analytics 4.



### Features
- Display a customizable popup to accept or reject cookies. Pop up consists of: 
    - Title, body, accept/reject buttons and a link to Privacy Policy page.
- Create a cookie library showing: 
    - Tables with details about site's necessary cookies and additional cookies: cookie name, provider name, purpose, expiry, type.
    - Radio inputs (accept all, reject all) and submit button to update preferences.

### Built with

- Sveltekit.
- Typescript.

<br/>

## Installation

```
$ npm i sveltekit-cookie-manager
```
<br/>

## How to use

### Show popup

1. Import `CookieManager` component 

```
import { CookieManager } from 'sveltekit-cookie-manager';`
```

2. Add `CookieManager` to your html passing a configuration variable with desired settings as shown in example below:


```
<script>
    import { CookieManager } from 'sveltekit-cookie-manager';
	import type { SKCMConfiguration } from 'sveltekit-cookie-manager';

	let configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'myCustomKey',
			googleAnalytics4Id: 'myCustomKey'
		},
		theme: {
			primary: '#14cabf',
			dark: '#131f37',
		}
	};
</script>

<CookieManager {configuration} />
``` 



### Show cookie library

1. Import `CookieLibrary` component 
```
import { CookieLibrary } from 'sveltekit-cookie-manager';`
```
2. Add `CookieLibrary` to your html passing a configuration variable with desired settings as shown in example below. You can just add `theme` object to it, no need to define other available variables in type `SKCMConfiguration`:


```
<script>
	import { CookieLibrary } from 'sveltekit-cookie-manager';
	import type { SKCMConfiguration } from 'sveltekit-cookie-manager';

	let configuration: SKCMConfiguration = {
		theme: {
			primary: '#14cabf',
			light: '#fff',
		}
	};
</script>

<CookieLibrary {configuration} />
``` 
<br/>


## Available configuration
Custom configuration variable must be of type `SKCMConfiguration`. All available props are shown below:

```
let configuration: SKCMConfiguration = {
	disclaimer: {
		title?: string,
		body?: string,
		policyText?: string,
		policyUrl?: string,
		acceptButtonText?: string,
		rejectButtonText?: string,
	},
	services: {
		googleAnalyticsUniversalId?: string,
		googleAnalytics4Id?: string
	},
	theme: {
		primary?: string;
		dark?: string;
		medium?: string;
		light?: string;
	}
};
``` 

### Popup props

`title`: The title of the popup. Default value: "Cookie Preferences".

`body`: The body of the popup. Default value: "For an optimal website experience, we use cookies and similar technologies to show personalized content, offer features and collect statistics. Clicking on "Accept" allows us to process this data and share it with third parties according to our privacy policy. You can view and change the current settings at any time.".

`policyText`: Text that links to Privacy Policy. Default value: "Read our cookie policy".

`policyUrl`: Privacy Policy url. Default value: "https://iota.org/privacy-policy".

`acceptButtonText`: Text shown in 'Accept' button. Default value: "Accept Additional Cookies".

`rejectButtonText`: Text shown in 'Reject' button. Default value: "Reject Additional Cookies".


### Services props

`googleAnalyticsUniversalId`: Your custom Google Analytics Universal key.

`googleAnalytics4Id`:Your custom Google Analytics 4 key.


### Theme props
A 4-colour palette has been predefined following IOTA's style guide. You may overwrite these values in your custom configuration variable.

`primary`: Used in buttons backgrounds, anchors. Default value: `#14cabf` (teal).

`dark`: Used in headings, body. Default value: `#131f37` (black).

`medium`: Used in table headings, table borders. Default value: `#b0bfd9` (gray).

`light`: Used in banner background colour, buttons text colour. Default value: `#fff` (white).


## Release Package

`npm run package && cd package && npm publish --access=public`