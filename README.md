# Sveltekit Cookie Manager

## About The Project

Sveltekit Cookie Manager reduces the workload of creating and mantaining multiple cookie consents by centralizing them into this package. 
Enables cookie management of:
- Google Analytics Universal.
- Google Analytics 4.



### Features
- Display a customizable popup to accept or reject cookies. Pop up consists of: 
    - Title, body, Accept/Reject buttons and a link to Privacy Policy page.
- Create a cookie library showing: 
    - Tables with details about site's Necessary Cookies and Additional Cookies: cookie name, provider name, purpose, expiry, type.
    - A radio input to update cookie configuration.

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

	let customConfiguration = {
		disclaimer: {
			title: 'Custom Title',
			body: 'Custom Body'
		},
		services: {
			googleAnalyticsUniversalId: 'myCustomID',
			googleAnalytics4Id: 'myCustomID'
		}
	};
</script>

<CookieManager configuration={customConfiguration} />
``` 

You may also set the type of your configuration variable:
```
<script>
	import type { SKCMConfiguration } from '@iota/sveltekit-cookie-manager';

    let customConfiguration: SKCMConfiguration = {
		disclaimer: {},
		services: {}
	};
</script>
``` 

### Show cookie library

```
<script>
    import { CookieLibrary } from '@iota/sveltekit-cookie-manager';
</script>

<CookieLibrary />
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
		}
	};
``` 

## Styling
A 4-colour palette has been predefined following IOTA's style guide. You may overwrite these values in your custom css to match your site's styles.

```
//teal: used in buttons backgrounds, anchors 
$skcm-primary: #14cabf;

//black: used in headings, body
$skcm-dark: #131f37;

//gray: used in table headings, table borders
$skcm-medium: #b0bfd9;

//white: used in banner background colour, buttons text colour
$skcm-light: #fff;
```