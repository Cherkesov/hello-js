/**
 * Created by scherk01 on 25.07.2016.
 */

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


var canvasEl = document.getElementById('canvas'),
    context2d = canvasEl.getContext('2d'),
    inputImageEl = document.getElementById('inputImage'),
    saveImageEl = document.getElementById('saveImage');

inputImageEl.addEventListener('change', function (e) {
    if (this.files && this.files[0]) {
        var file = this.files[0];
        var fr = new FileReader();
        fr.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                context2d.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        fr.readAsDataURL(file);
    }
});

saveImageEl.addEventListener('click', function (e) {
    var dataURL = canvasEl.toDataURL('image/jpeg');
    var blob = dataURItoBlob(dataURL);
    var fd = new FormData(document.forms[0]);
    fd.append('image[binaryContent]', blob, 'thumb.jpg');
    fd.append('description', '');

    ajaxPost('http://fair-wildcat-4550.vagrantshare.com/app_dev.php/api/work/', fd, function (e) {
        console.log(JSON.parse(this.responseText));
    });
});