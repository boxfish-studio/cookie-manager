# Sveltekit Cookie Manager

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
    - An input to update preferences.

### Built with

- Sveltekit.
- Typescript.

## Installation

```
$ npm i @iota/sveltekit-cookie-manager
```

## How to use

### Show popup

1. Import `CookieManager` component 

```
import { CookieManager } from '@iota/sveltekit-cookie-manager';`
```

2. Add `CookieManager` to your html passing a configuration variable with desired settings as shown in example below:


```
<script>
    import { CookieManager } from '@iota/sveltekit-cookie-manager';
	import type { SKCMConfiguration } from 'sveltekit-cookie-manager';

	let configuration: SKCMConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'myCustomID',
			googleAnalytics4Id: 'myCustomID'
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


## Available configuration
Custom configuration variable must be of type `SKCMConfiguration`. All available props are shown below:

```
let customConfiguration: SKCMConfiguration = {
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

## Theme
A 4-colour palette has been predefined following IOTA's style guide. You may overwrite these values in your custom configuration variable.

```
//primary (default teal): used in buttons backgrounds, anchors 
primary: #14cabf;

//dark (default black): used in headings, body
dark: #131f37;

//medium (default gray): used in table headings, table borders
medium: #b0bfd9;

//light (default white): used in banner background colour, buttons text colour
light: #fff;
```