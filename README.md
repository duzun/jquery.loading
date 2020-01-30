# jquery.loading

Add class(es) to DOM elements while waiting for async action. Promise or callback.

## Install

The simplest way is to include `loading.js` in your HTML after `jQuery` script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://unpkg.com/class-loading"></script>
```

If you are using `npm`:

```sh
npm install -S class-loading
```

## Import or require

This library can be included either as an ESM or UMD.

#### ESM

```js
import initLoading from 'class-loading';
import $ from 'jquery';

initLoading($);
```

#### CommonJS

```js
const initLoading = require('class-loading');
const $ = require('jquery');

initLoading($);
```

## Usage

```js
// 1. Stack multiple loaders
  	$('selector').loading('loading loader-1'); // add classes
  	$('selector').loading('disabled'); // add another class
  	// ...
  	$('selector').loading(false); // remove .disabled
  	$('selector').loading(false); // remove .loading.loader-1

// 2. Get a callback to remove classes
  	var cb = $('selector').loading('loading loader-2', true);
  	// ...
  	cb(); // remove added loading class

// 3. Wait for a Promise to resolve/reject
  	$('selector').loading('loading loader-3', promise);
```
