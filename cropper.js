/**
 * Created by scherk01 on 25.07.2016.
 */

var TO_RADIANS = Math.PI / 180;

var canvasEl = document.getElementById('canvas'),
    ctx = canvasEl.getContext('2d'),
    inputImageEl = document.getElementById('inputImage'),
    $rotateLeftEl = $('#rotate_l'),
    $rotateRightEl = $('#rotate_r'),
    $translateTopEl = $('#translate_t'),
    $translateRightEl = $('#translate_r'),
    $translateBottomEl = $('#translate_b'),
    $translateLeftEl = $('#translate_l'),
    $scaleIncreaseEl = $('#scale_inc'),
    $scaleDecreaseEl = $('#scale_dec'),
    saveImageEl = document.getElementById('saveImage');

var currImage = new Image();

inputImageEl.addEventListener('change', function (e) {
    if (this.files && this.files[0]) {
        var file = this.files[0];
        var fr = new FileReader();
        fr.onload = function (e) {
            currImage.onload = function () {
                ctx.drawImage(currImage, 0, 0);
            };
            currImage.src = e.target.result;
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


$(function () {
    var oldPositionX = 0,
        oldPositionY = 0,
        oldScaleX = 1,
        oldScaleY = 1,
        oldSkewingX = 0,
        oldSkewingY = 0;

    var angle = 15 * TO_RADIANS;
    $rotateLeftEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        // oldScaleX += Math.cos(-angle); // TODO: wrong calc
        oldSkewingX += Math.sin(-angle);
        oldSkewingY -= Math.sin(-angle);
        // oldScaleY += Math.cos(-angle); // TODO: wrong calc
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });
    $rotateRightEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        // oldScaleX += Math.cos(angle); // TODO: wrong calc
        oldSkewingX += Math.sin(angle);
        oldSkewingY -= Math.sin(angle);
        // oldScaleY += Math.cos(angle); // TODO: wrong calc
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });

    var translateSpeed = 50;
    $translateTopEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldPositionY -= translateSpeed;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });
    $translateRightEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldPositionX += translateSpeed;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });
    $translateBottomEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldPositionY += translateSpeed;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });
    $translateLeftEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldPositionX -= translateSpeed;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });

    var scaleCoef = 0.1;
    $scaleIncreaseEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldScaleX *= 1 + scaleCoef;
        oldScaleY *= 1 + scaleCoef;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });
    $scaleDecreaseEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        oldScaleX /= 1 + scaleCoef;
        oldScaleY /= 1 + scaleCoef;
        ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
        ctx.drawImage(currImage, 0, 0);
    });


    var movement = false, mouseOldX = 0, mouseOldY = 0;

    $("#canvas").mouseup(function () {
        movement = false;
    }).mousedown(function (event) {
        movement = true;
        mouseOldX = event.pageX;
        mouseOldY = event.pageY;
    }).mousemove(function (event) {
        if (movement) {
            var movementX = event.pageX - mouseOldX;
            var movementY = event.pageY - mouseOldY;

            oldPositionX += movementX;
            oldPositionY += movementY;
            ctx.setTransform(oldScaleX, oldSkewingX, oldSkewingY, oldScaleY, oldPositionX, oldPositionY);
            ctx.drawImage(currImage, 0, 0);

            mouseOldX = event.pageX;
            mouseOldY = event.pageY;
        }
    });
});
