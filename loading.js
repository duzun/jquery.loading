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
 * @param string|array classes - classes to be added to collection while loading
 * @param bool|Promise retCb - if true, return a done() function to be called when done loading
 *                           - if a promise, remove classes on resolve or reject
 *
 * @return jQuery|function - by default (no retCb) it returns the jQuery collection (this),
 *                           but if retCb not falsy, done() function returned
 *
 * @license MIT
 * @author Dumitru Uzun (DUzun.Me)
 * @version 1.1.0
 */

;(function (window) {
    'use strict';
    // ---------------------------------------------------------------------------
    var undefined
    ,   UNDEFINED = undefined + ''
    ,   FUNCTION = 'function'
    ,   jq = window.jQuery || window.Zepto
    ;
    (typeof define !== FUNCTION || !define.amd
        ? typeof module == UNDEFINED || !module.exports
            ? function (deps, factory) { factory(jq); } // Browser
            : function (deps, factory) { module.exports = factory(jq||require('jquery')); } // CommonJs
        : define // AMD
    )
    /*define*/(/*name, */[jq?null:'jquery'], function factory(jQuery) {
        // ---------------------------------------------------------------------------
        var $ = jQuery || jq;

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

        return $.fn.loading = loading;
    });
}
(this));
