/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */

var fns = [],
    listener, doc = document,
    hack = doc.documentElement.doScroll,
    domContentLoaded = 'DOMContentLoaded',
    loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


if (!loaded)
    doc.addEventListener(domContentLoaded, listener = function() {
        doc.removeEventListener(domContentLoaded, listener)
        loaded = 1
        while (listener = fns.shift()) listener()
    })

export default function(fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
}
