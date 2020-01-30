(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.jquery_class_loading = factory());
}(this, (function () { 'use strict';

    /**
     * A jQuery plugin to add/remove classes to a collection while a promise is pending or something is loading asynchronously.
     *
     * @license MIT
     * @author Dumitru Uzun (DUzun.Me)
     * @version 1.2.1
     */
    function initLoading($) {
      var lck = '_loading_class_';
      var lcd = lck + 'disabled_';
      var prp = 'disabled';
      /**
       * Adds/Removes loading class on the collection.
       *
       * Usage:
       *   1)
       *       $('selector').loading('loading'); // add class
       *       ...
       *       $('selector').loading(false); // remove added loading class
       *
       *   2)
       *       const done = $('selector').loading('loading', true); // add class and get the callback
       *       ...
       *       done(); // remove added loading class
       *
       *   3)
       *       $('selector').loading('loading', promise); // add class and remove on promise resolve or reject
       *
       *   4)
       *       const done = $('selector').loading('loading', promise); // add class and remove on promise resolve or reject
       *       setTimeout(done, 5e3); // timeout if promise takes too long
       *
       * @param {String|Array} classes  - classes to be added to collection while loading
       * @param {Boolean|Promise} retCb - if true, return a done() function to be called when done loading
       *                                - if a promise, remove classes on resolve or reject
       *
       * @return {jQuery|Function} - by default (no retCb) it returns the jQuery collection (this),
       *                             but if retCb not falsy, done() function returned
       */

      var loading = function loading(classes) {
        var retCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var that = this;

        if (classes === false) {
          that.each(function (i, e) {
            e = $(e);
            i = e.data(lck);

            if (i) {
              e.removeClass(i).data(lck, undefined);
            }

            i = e.data(lcd);

            if (i) {
              e.attr(i, null).prop(i, false).data(lcd, undefined);
            }
          });
        } else {
          if (retCb) {
            that.addClass(classes).attr(prp, prp).prop(prp, true);

            var _done = function done(a) {
              // Prevent calling it more then once
              if (_done) {
                that.removeClass(classes).attr(prp, null).prop(prp, false);
                _done = undefined;
              }

              return arguments.length == 1 ? a : that; // in Promises return the result without altering it
            }; // If retCb is a promise, call done() on resolve and reject


            if (retCb !== true && $.isFunction(retCb.then)) {
              retCb.then(_done, _done);
            }

            return _done;
          }

          that.each(function (i, e) {
            e = $(e);
            i = e.data(lck);
            e.data(lck, (i ? i + ' ' : '') + classes);

            if (!e.prop(prp)) {
              e.attr(prp, prp).prop(prp, true).data(lcd, prp);
            }
          }).addClass(classes);
        }

        return that;
      };

      $.fn.loading = loading;
      return loading;
    } // Auto-init in browser when jQuery or Zepto is present

    if (typeof window !== 'undefined') {
      var $ = window.jQuery || window.Zepto;

      if ($) {
        initLoading($);
      }
    }

    return initLoading;

})));
//# sourceMappingURL=loading.js.map
