/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * This shim allows elements written in, or compiled to, ES5 to work on native
 * implementations of Custom Elements v1. It sets new.target to the value of
 * this.constructor so that the native HTMLElement constructor can access the
 * current under-construction element's definition.
 */
(function () {
    const w = window as any;
    if (
        // No Reflect, no classes, no need for shim because native custom elements
        // require ES2015 classes or Reflect.
        w.Reflect === undefined ||
        w.customElements === undefined ||
        // The webcomponentsjs custom elements polyfill doesn't require
        // ES2015-compatible construction (`super()` or `Reflect.construct`).
        w.customElements.polyfillWrapFlushCallback
    ) {
        return;
    }
    const BuiltInHTMLElement = HTMLElement;
    /**
     * With jscompiler's RECOMMENDED_FLAGS the function name will be optimized away.
     * However, if we declare the function as a property on an object literal, and
     * use quotes for the property name, then closure will leave that much intact,
     * which is enough for the JS VM to correctly set Function.prototype.name.
     */
    const wrapperForTheName = {
        'HTMLElement': /** @this {!Object} */ function HTMLElement() {
            return Reflect.construct(
                BuiltInHTMLElement, [], /** @type {!Function} */(this.constructor));
        }
    };
    w.HTMLElement = wrapperForTheName['HTMLElement'] as any;
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();
