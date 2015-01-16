/*!
 * Parallax Image Feed v1.0.0
 * https://github.com/g-wilson/parallax-image-feed
 *
 * Subtle parallax effect for scrolling through a feed of images.
 *
 * Author: George Wilson - @george_wilson
 * License: MIT
 *   
 */
(function() {
  'use strict';

  // Detect whether this module is being loaded with browserify (CommonJS format)
  var isCommonJS = (typeof module !== 'undefined' && module.exports);

  // Is jQuery in the global scope?
  var $ = window.$ || window.jQuery || null;

  // Require it if not
  if (isCommonJS && !$) {
    $ = require('jquery');
  }

  // Export object representing this module's public properties/methods.
  var self = {};

  // Config actually used
  self.config = {};

  // Default config
  self.defaults = {
    wrapper_selector: '.plx_block',
    scale_factor: 40,
    debounce: 10
  };

  /**
   *  Activate the parallax effect with an optional config object
   */
  self.init = function(config) {

    // Set up configs using defaults
    if (config) {
      $.extend(self.config, self.defaults, config);
    } else {
      self.config = self.defaults;
    }

    // Do an initial render
    self.render();

    // Set up scroll event
    $(window).on('scroll', _debounce(function() {
        self.render();
      }, self.config.debounce)
    );

  };

  /**
   *  Calculates the relative position of the image inside the viewport.
   *  Translates that value into an offset between the image and it's wrapper.
   */
  self.render = function() {
    var winPos = {};
    winPos.top = $(window).scrollTop();
    winPos.bottom = winPos.top + $(window).outerHeight();

    $(self.config.wrapper_selector).each(function() {
      var $block = $(this),
          blockPos = $block.offset().top,
          blockHeight = $block.outerHeight(),
          viewTop = winPos.top - blockHeight,
          viewHeight = (winPos.bottom - winPos.top) + blockHeight,
          relPos = ((blockPos - viewTop) / viewHeight) * 100;

      if (relPos > 100) {
        relPos = 100;
      }
      if (relPos < 0) {
        relPos = 0;
      }

      if (relPos <= 0 || relPos >= 100) {
        return;
      }

      var scale = ((self.config.scale_factor / 100) * relPos);

      $block.css({
        overflow: 'hidden',
        height: blockHeight + 'px',
        position: 'relative'
      });

      $block.find('img').css({
        width: 'auto',
        'max-width': 'none',
        height: '1' + self.config.scale_factor + '%',
        display: 'block',
        position: 'absolute',
        top: '-' + scale + '%',
        left: '-' + (self.config.scale_factor / 2) + '%'
      });

    });
  };

  /**
   *  Debounce for scroll performance. (Private)
   *
   *  From: http://davidwalsh.name/javascript-debounce-function
   */
  var _debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  // If browserify, export the module, if not make it a global.
  if (isCommonJS) {
    module.exports = self;
  } else {
    window.PLX = self;
  }

})();
