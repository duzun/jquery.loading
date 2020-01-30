/**
 * A jQuery plugin to add/remove classes to a collection while a promise is pending or something is loading asynchronously.
 *
 * @license MIT
 * @author Dumitru Uzun (DUzun.Me)
 * @version 1.2.0
 */
// ---------------------------------------------------------------------------
export default function initLoading($) {

        /**
         * Adds/Removes loading class on the collection.
         *
         * Eg:
         *   1)
         *       $('selector').loading('loading'); // add class
         *       ...
         *       $('selector').loading(false); // remove added loading class
         *   2)
         *       var cb = $('selector').loading('loading', true); // add class and get the callback
         *       ...
         *       cb(); // remove added loading class
         *   3)
         *       $('selector').loading('loading', promise); // add class and remove on promise resolve or reject
         *
         * @param {String|Array} classes - classes to be added to collection while loading
         * @param {Boolean|Promise} retCb - if true, return a done() function to be called when done loading
         *                           - if a promise, remove classes on resolve or reject
         *
         * @return {jQuery|Function} - by default (no retCb) it returns the jQuery collection (this),
         *                           but if retCb not falsy, done() function returned
         */
        function loading(classes, retCb) {
            var lck = '_loading_class_';
            var lcd = lck + 'disabled_';
            var prp = 'disabled';
            var that = this;
            if ( classes === false ) {
                that.each(function (i,e) {
                    e = $(e);
                    i = e.data(lck);
                    if ( i ) {
                        e.removeClass(i).data(lck, undefined);
                    }
                    i = e.data(lcd);
                    if ( i ) {
                        e.attr(i, null).prop(i, false).data(lcd, undefined);
                    }
                });
            }
            else {
                if ( retCb ) {
                    that.addClass(classes).attr(prp, prp).prop(prp, true);
                    var done = function (a) {
                        // Prevent calling it more then once
                        if ( done ) {
                            that.removeClass(classes).attr(prp, null).prop(prp, false);
                            done = undefined;
                        }
                        return arguments.length == 1 ? a : that; // in Promises return the result without altering it
                    };
                    // If retCb is a promise, call done() on resolve and reject
                    if ( $.isFunction(retCb.then) ) {
                        retCb.then(done, done);
                    }
                    return done;
                }
                that.each(function (i,e) {
                    e = $(e);
                    i = e.data(lck);
                    e.data(lck, (i?i+' ':'')+classes);
                    if ( !e.prop(prp) ) {
                        e.attr(prp, prp).prop(prp, true).data(lcd, prp);
                    }
                })
                .addClass(classes);
            }
            return that;
        }

    $.fn.loading = loading;

    return loading;
}

// Auto-init in browser when jQuery or Zepto is present
if ( typeof window !== 'undefined' ) {
    const $ = window.jQuery || window.Zepto;
    if ( $ ) initLoading($);
}
