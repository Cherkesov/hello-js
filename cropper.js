/**
 * Created by scherk01 on 25.07.2016.
 */

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