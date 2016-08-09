/**
 * Created by scherk01 on 09.08.2016.
 */

String.prototype.startsWith = function (prefix) {
    return (this.indexOf(prefix) == 0);
};

String.prototype.endsWith = function (suffix) {
    return this.match(suffix + '$') == suffix;
};

String.prototype.splitIfNotEmpty = function (separator) {
    return this === '' ? [] : this.split(separator);
};

/**
 * Cross-browser add event method
 * @param {String} eventName
 * @param {Function} cb
 */
Element.prototype.wfAddEventListener = function (eventName, cb) {
    if (this.addEventListener) {
        this.addEventListener(eventName, cb);
    } else if (this.attachEvent) {
        this.attachEvent('on' + eventName, function () {
            cb.call(this);
        });
    }
};

/**
 * Cross-browser remove event method
 * @param {String} eventName
 * @param {Function} cb
 */
Element.prototype.wfRemoveEventListener = function (eventName, cb) {
    if (this.removeEventListener)
        this.removeEventListener(eventName, cb);
    else if (this.detachEvent)
        this.detachEvent('on' + eventName, cb);
};

/**
 * Cross-browser remove event method
 * @param {String} selector
 */
Element.prototype.wfClosest = function (selector) {
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

    var parent, el = this;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector))
            return parent;
        el = parent;
    }

    return null;
};

/**
 * Get image from canvas
 * @param mimeType
 * @returns {Blob}
 */
Element.prototype.wfGetBlobImage = function (mimeType) {
    if (this.tagName.toLowerCase() !== 'canvas') return null;
    mimeType = mimeType || 'image/jpeg';
    return dataURItoBlob(this.toDataURL(mimeType));
};