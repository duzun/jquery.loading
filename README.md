# jquery.loading

Add class(es) to DOM elements while waiting for async action. Promise or callback.

## Install

The simplest way is to include `loading.js` in your HTML:

```html
<script src="https://unpkg.com/class-loading"></script>
```

If you are using `npm`:

```sh
npm install -S class-loading
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
