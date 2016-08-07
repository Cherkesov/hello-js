/**
 * Created by scherk01 on 05.08.2016.
 */

(function () {
    // alert('Some module!');
}());

+function () {
    // alert('Module example with complex expression # 1');
}();

!function () {
    // alert('Module example with complex expression # 2');
}();


var reusableModuleNo1 = (function (d) {
    var version = '0.0.1';

    function assignDefaults() {
        // do something
    }

    return {
        init: function () {
            var div = d.createElement('div');
            div.className = "alert alert-success";
            div.innerHTML = "<strong>Reusable Module</strong> initialization!";
            d.body.appendChild(div);
        }
    }
})(document);