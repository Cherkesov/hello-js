/**
 * Created by scherk01 on 04.08.2016.
 */

ymaps.ready(init);
var myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 12
    });

    var options = {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'blue-circle.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -15]
    };

    var placemarks = [];

    for (var i1 = 1; i1 <= 20; i1++) {
        var mark1 = new ymaps.Placemark([55.76, 37.64], {
            hintContent: 'Москва! ' + i1,
            balloonContent: 'Столица России ' + i1
        }, options);
        placemarks.push(mark1);
    }
    for (var i2 = 1; i2 <= 25; i2++) {
        var mark2 = new ymaps.Placemark([55.74, 37.62], {
            hintContent: 'Москва! ' + i2,
            balloonContent: 'Столица России ' + i2
        }, options);
        placemarks.push(mark2);
    }
    for (var i3 = 1; i3 <= 7; i3++) {
        var mark3 = new ymaps.Placemark([55.78, 37.62], {
            hintContent: 'Москва! ' + i3,
            balloonContent: 'Столица России ' + i3
        }, options);
        placemarks.push(mark3);
    }

    var clusterIcons = [
        {
            href: 'blue-circle.png',
            size: [30, 30],
            offset: [-15, -15]
        },
        {
            href: 'blue-circle.png',
            size: [46, 46],
            offset: [-23, -23]
        },
        {
            href: 'blue-circle.png',
            size: [60, 60],
            offset: [-30, -30],
            shape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 30
            }
        }];
    var myIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>');
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,

        clusterIcons: clusterIcons,
        clusterNumbers: [10, 20],
        clusterIconContentLayout: myIconContentLayout
    });
    clusterer.add(placemarks);
    myMap.geoObjects.add(clusterer);
}