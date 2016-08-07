/**
 * Get URI (without schema, host-name, query params and hash)
 * @returns {string}
 */
function getUri() {
    return '/' + window.location.pathname.substr(1);
}

/**
 * Parse all query parameters
 * @returns {Object}
 */
function getQueryParams() {

    /*var setData = function (obj, keys, val) {
     if (keys.length > 1) {
     setData(obj[keys[0]], keys.slice(1, keys.length), val);
     } else {
     if (obj[keys[0]].push != undefined) {
     obj[keys[0]].push(val);
     } else if (typeof obj[keys[0]] == 'string') {
     var tmp = obj[keys[0]];
     obj[keys[0]] = [];
     obj[keys[0]].push(tmp);
     obj[keys[0]].push(val);
     } else {
     obj[keys[0]] = val;
     }
     }
     };*/

    var result = {};

    var data = decodeURIComponent(window.location.href);
    var start = data.indexOf('?');

    if (start == -1) return result;

    data = data.substr(start + 1, data.length - start).split('&');
    for (var i = 0; i < data.length; i++) {
        var t = data[i].split('='),
            name = t[0],
            val = t[1];

        name = name.replace('][', '.').replace('[', '.').replace(']', '');
        var names = name.split('.');

        var node = result;
        //var tmpNames = [];
        for (var j = 0; j < names.length; j++) {
            var key = names[j] != '' ? names[j] : node.length;
            if (names[j] != '') {
                key = names[j];
                if (node[key] == undefined) {
                    node[key] = [];
                }
                if (j + 1 == names.length) {
                    node[key] = val;
                }
            } else  {
                key = node.length;
                if (node == undefined) {
                    node = [];
                }
                node.push(val);
            }
            //tmpNames.push(key);
            //console.log('Create node:' + tmpNames.join('->'));
            node = node[key];
        }
    }
    return result;
}

/**
 * Get value of query parameter by name
 * @param {String} name
 * @returns {Object|null}
 */
function getQueryParam(name) {
    return getQueryParams()[name] || null;
}

/**
 * Remove repeated elements
 * @param {Array} arr
 * @returns {Array}
 */
function removeDuplicatesFromArr(arr) {
    return arr.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    });
}

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
    } else if (el.attachEvent) {
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
    else if (el.detachEvent)
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