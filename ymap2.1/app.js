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

    var placemarks = [
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 01', balloonContent: 'Столица России 01'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 02', balloonContent: 'Столица России 02'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 03', balloonContent: 'Столица России 03'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 04', balloonContent: 'Столица России 04'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 05', balloonContent: 'Столица России 05'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 06', balloonContent: 'Столица России 06'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 07', balloonContent: 'Столица России 07'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 08', balloonContent: 'Столица России 08'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 09', balloonContent: 'Столица России 09'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 10', balloonContent: 'Столица России 10'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 11', balloonContent: 'Столица России 11'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 12', balloonContent: 'Столица России 12'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 13', balloonContent: 'Столица России 13'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 14', balloonContent: 'Столица России 14'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 15', balloonContent: 'Столица России 15'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 16', balloonContent: 'Столица России 16'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 17', balloonContent: 'Столица России 17'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 18', balloonContent: 'Столица России 18'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 19', balloonContent: 'Столица России 19'}, options),
        new ymaps.Placemark([55.76, 37.64], {hintContent: 'Москва! 20', balloonContent: 'Столица России 20'}, options),


        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 01', balloonContent: 'Столица России 01'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 02', balloonContent: 'Столица России 02'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 03', balloonContent: 'Столица России 03'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 04', balloonContent: 'Столица России 04'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 05', balloonContent: 'Столица России 05'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 06', balloonContent: 'Столица России 06'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 07', balloonContent: 'Столица России 07'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 08', balloonContent: 'Столица России 08'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 09', balloonContent: 'Столица России 09'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 10', balloonContent: 'Столица России 10'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 11', balloonContent: 'Столица России 11'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 12', balloonContent: 'Столица России 12'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 13', balloonContent: 'Столица России 13'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 14', balloonContent: 'Столица России 14'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 15', balloonContent: 'Столица России 15'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 16', balloonContent: 'Столица России 16'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 17', balloonContent: 'Столица России 17'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 18', balloonContent: 'Столица России 18'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 19', balloonContent: 'Столица России 19'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 20', balloonContent: 'Столица России 20'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 21', balloonContent: 'Столица России 21'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 22', balloonContent: 'Столица России 22'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 23', balloonContent: 'Столица России 23'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 24', balloonContent: 'Столица России 24'}, options),
        new ymaps.Placemark([55.74, 37.62], {hintContent: 'Москва! 25', balloonContent: 'Столица России 25'}, options),


        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 01', balloonContent: 'Столица России 01'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 02', balloonContent: 'Столица России 02'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 03', balloonContent: 'Столица России 03'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 04', balloonContent: 'Столица России 04'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 05', balloonContent: 'Столица России 05'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 06', balloonContent: 'Столица России 06'}, options),
        new ymaps.Placemark([55.78, 37.62], {hintContent: 'Москва! 07', balloonContent: 'Столица России 07'}, options),
    ];

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
        '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>')
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,

        clusterIcons: clusterIcons,
        clusterNumbers: [10, 20],
        clusterIconContentLayout: myIconContentLayout
    });
    clusterer.add(placemarks);
    myMap.geoObjects.add(clusterer);
}