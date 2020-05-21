# js-template

Template loader in 800 bytes - what could be better? This tiny library allows you to use a file template in your page. This removes the bad practice of writing HTML inside JavaScript.

It is recommended that the iQwerty [`binding.js`](https://github.com/mlcheng/js-binding) library be used in conjuction with this as well.

A demo is available on my [playground](https://playground.michaelcheng.us/lib-js/template/).

## Usage
To use a template on your page, just

```html
<div data-iq-template-src="view.html"></div>
```

This will inject the `view.html` file into your `<div>`.

That's it.

## Advanced usage
800 bytes doesn't mean no features. The iQwerty templating library still offers some advanced features that you may find useful.

### Callbacks
A callback can be set that will be called after the template is loaded.

```html
<div
	data-iq-template-src="view.html"
	data-iq-template-loaded="handleView">
</div>
```

Where `handleView` is a function name that must be accessible in the `window` scope (i.e. it must be global scope, sorry).

```javascript
function handleView() {
	//Do awesome stuff
}
```

### Explicit template loading
It is possible to load a template's content declaratively.

```javascript
iqwerty.template.loadTemplate(url, callback, target)
```

The first two argument are self-explanatory. The `target` can be used to set the HTML element where the template should be inserted.

### Data binding
If you use the iQwerty data binding library, you can also bind data onto your template. You can get more information on the data binding library [here](https://github.com/mlcheng/js-binding), but the gist of it is that you set a callback to a one-time `iqwerty.binding.model()` call to set the binding model.

Have fun!
