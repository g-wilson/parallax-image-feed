Tired of the same dull, static image feeds on your homepage or weblog?

Always wanted your image feed to look like something's slightly blocking the view?

Want to impress your friends, boss, or spouse?

Introducing...

**Javascript Thing For Subtle Parallax Effect For Image Feeds On Your Website**

---

### Usage

It might be a good idea to initialise this after your images have 100% loaded. This repo will not help you with that.

If you're adding or removing feed items you can call .render() to immediately calculate the correct dimensions, but it happens on every scroll event anyway.

With Browserify:

```
var amazingParallaxImageFeedEffect = require('./parallax');

amazingParallaxImageFeedEffect.init({
  wrapper_selector: '.plx_block', // Element that wraps your image
  scale_factor: 40, // How much you want your design to POP
  debounce: 10 // You can tweak this for smoothness or performance
});
```

Without Browserify (make sure you've got jQuery and this script loaded already):

```
window.PLX.init({
  wrapper_selector: '.plx_block', // Element that wraps your image
  scale_factor: 40, // How much you want your design to POP
  debounce: 10 // You can tweak this for smoothness or performance
});
```

### About

Author: George Wilson (https://github.com/g-wilson, @george_wilson)
License: MIT
