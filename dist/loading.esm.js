/**
 * A jQuery plugin to add/remove classes to a collection while a promise is pending or something is loading asynchronously.
 *
 * @license MIT
 * @author Dumitru Uzun (DUzun.Me)
 * @version 1.4.0
 */
export default function initLoading($) {
    const lck = '_loading_class_';
    const lcd = lck + 'disabled_';
    const prp = 'disabled';
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
    const loading = function loading(classes, retCb = undefined) {
        const that = this;
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
        }
        else {
            if (retCb) {
                // On `.disabled = true` the element loses focus
                const focused = that.filter(isFocused);
                that.addClass(classes).attr(prp, prp).prop(prp, true);
                let done = function (a) {
                    // Prevent calling it more then once
                    if (done) {
                        that.removeClass(classes).attr(prp, null).prop(prp, false);
                        done = undefined;
                        // Restore the focus on `.disabled = false`
                        focused.each(reFocusIf);
                    }
                    return arguments.length == 1 ? a : that; // in Promises return the result without altering it
                };
                // If retCb is a promise, call done() on resolve and reject
                if (retCb !== true && $.isFunction(retCb.then)) {
                    retCb.then(done, done);
                }
                return done;
            }
            that.each(function (i, e) {
                e = $(e);
                i = e.data(lck);
                e.data(lck, (i ? i + ' ' : '') + classes);
                if (!e.prop(prp)) {
                    e.attr(prp, prp).prop(prp, true).data(lcd, prp);
                }
            })
                .addClass(classes);
        }
        return that;
    };
    $.fn.loading = loading;
    function isFocused() {
        const elem = this;
        return elem.ownerDocument.activeElement === elem;
    }
    function reFocusIf() {
        const elem = this;
        const { ownerDocument } = elem;
        const { activeElement } = ownerDocument;
        // Avoid re-focusing if another element or elem it is focused
        if (activeElement && (activeElement === elem || activeElement !== ownerDocument.body))
            return;
        // Avoid re-focusing if out of viewport to avoid scrolling the page
        if (!isOnViewport(elem))
            return;
        return elem.focus();
    }
    // A better inView() version sketch
    function isOnViewport(elem) {
        if (!elem.getBoundingClientRect)
            return;
        const rect = elem.getBoundingClientRect();
        if (!rect.height && !rect.width)
            return false; // display: none ?
        if (rect.top < 0 || rect.left < 0)
            return false;
        const { ownerDocument } = elem;
        const { documentElement } = ownerDocument;
        let { clientHeight, clientWidth } = documentElement;
        if (typeof window !== 'undefined' && window.innerHeight) {
            clientHeight = window.innerHeight;
            clientWidth = window.innerWidth;
        }
        return (rect.bottom <= clientHeight &&
            rect.right <= clientWidth);
    }
    return loading;
}
// Auto-init in browser when jQuery or Zepto is present
if (typeof window !== 'undefined') {
    const $ = window.jQuery || window.Zepto;
    if ($) {
        initLoading($);
    }
}
