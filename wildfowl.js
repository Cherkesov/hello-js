/**
 * Created by scherk01 on 26.07.2016.
 */

// Functions from http://youmightnotneedjquery.com/

/**
 * Cross-browser event attachment
 * @param {Element} el
 * @param {String} eventName
 * @param {Function} handler
 */
function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function () {
            handler.call(el);
        });
    }
}

/**
 * Cross-browser event detaching
 * @param {Element} el
 * @param {String} eventName
 * @param {Function} handler
 */
function removeEventListener(el, eventName, handler) {
    if (el.removeEventListener)
        el.removeEventListener(eventName, handler);
    else
        el.detachEvent('on' + eventName, handler);
}

/**
 * Handle on document ready
 * @param {Function} fn
 */
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

/**
 * Trigger event
 * @param {Element} el
 * @param {String} eventName
 */
function trigger(el, eventName) {
    if (document.createEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        el.dispatchEvent(event);
    } else {
        el.fireEvent('on' + eventName);
    }
}


// And other wildfowl

/**
 * Find closest element in higher levels of DOM
 * @param {Element} el
 * @param {String} selector
 * @returns {Element}
 */
function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector']
        .some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        });

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

/**
 * Send post request with Ajax
 * @param {String} url
 * @param {FormData} formData
 * @param {Function} successCb
 */
function ajaxPost(url, formData, successCb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = successCb;
    xhr.send(formData);
}

/**
 * Convert base64 to blob
 * @param {String} dataURI
 * @returns {Blob}
 */
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
}