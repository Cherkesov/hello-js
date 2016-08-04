/**
 * Created by scherk01 on 25.07.2016.
 */

var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;

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


function Context2DManipulator(ctx, currImage) {
    this.ctx = ctx;
    this.currImage = currImage;

    this.oldPositionX = 0;
    this.oldPositionY = 0;
    this.oldScaleX = 1;
    this.oldScaleY = 1;
    this.oldSkewingX = 0;
    this.oldSkewingY = 0;
    this.angle = 0;

    this.show = function(){
        this.ctx.save();
        this.ctx.translate(this.oldPositionX, this.oldPositionY);
        this.ctx.rotate(this.angle);
        this.ctx.scale(this.oldScaleX,this.oldScaleY);
        this.ctx.drawImage(this.currImage, 0, 0);
        this.ctx.restore();
    };

    this.translate = function (tX, tY) {
        this.oldPositionX += tX;
        this.oldPositionY += tY;
        this.show();
    };

    this.rotate = function (angle) {
        this.angle += angle;
        this.show();
    };

    this.scale = function (sX, sY) {
        this.oldScaleX *= sX;
        this.oldScaleY *= sY;
        this.show();
    };

    return this;
}


$(function () {
    var manipulator = new Context2DManipulator(ctx, currImage);

    var angle = 15 * TO_RADIANS;
    $rotateLeftEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.rotate(angle);
    });
    $rotateRightEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.rotate(-angle);
    });

    var translateSpeed = 50;
    $translateTopEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.translate(0, -translateSpeed);
    });
    $translateRightEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.translate(translateSpeed, 0);
    });
    $translateBottomEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.translate(0, translateSpeed);
    });
    $translateLeftEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.translate(-translateSpeed, 0);
    });

    var scaleCoef = 0.1;
    $scaleIncreaseEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.scale(1 + scaleCoef, 1 + scaleCoef);
    });
    $scaleDecreaseEl.click(function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        manipulator.scale(1 - scaleCoef, 1 - scaleCoef);
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
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

            var movementX = event.pageX - mouseOldX;
            var movementY = event.pageY - mouseOldY;

            manipulator.translate(movementX, movementY);

            mouseOldX = event.pageX;
            mouseOldY = event.pageY;
        }
    });
});
