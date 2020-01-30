/**
 * $.fn.loading()
 */
interface ClassLoadingPlugin {
    // Add class(es)
    (classes: string | string[]): JQuery;

    // Add classes and get a callback which removes them
    (classes: string | string[], TRUE: boolean): Callback2JQuery;

    // Add classes and remove them on promise resolve or reject
    (classes: string | string[], waitFor: Promise<any>): Callback2JQuery;

    // Remove the added classes
    (FALSE: boolean): JQuery;
}

type Callback2JQuery = () => JQuery;


/**
 * Extend the jQuery result declaration with the loading plugin.
 */
interface JQuery {
    /**
     * Extension of the example plugin.
     */
    loading: ClassLoadingPlugin;
}

/**
 * For auto-init
 */
interface Window {
    jQuery: JQueryStatic;
    Zepto: JQueryStatic;
}
