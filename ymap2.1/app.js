/**
 * Created by scherk01 on 04.08.2016.
 */

ymaps.ready(init);
var map;

function init() {
    map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 12
    });

    /*
     Remove unused map controls
     */

    //map.controls.remove('zoomControl');
    //map.controls.remove('mapTools');
    //map.controls.remove('fullscreenControl');
    //map.controls.remove('geolocationControl');
    //map.controls.remove('routeEditor');
    //map.controls.remove('rulerControl');
    //map.controls.remove('searchControl');
    //map.controls.remove('trafficControl');
    //map.controls.remove('typeSelector');

    var options = {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'blue-circle.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -15],

        autoPan: true,
        autoPanMargin: 300,

        openBalloonOnClick: true,
        hideIconOnBalloonOpen: false,
        balloonLayout: "default#imageWithContent",
        balloonShadow: false,
        zIndex: 100,
        zIndexHover: 150,
        hasHint: false,
        minWidth: 250,
        closeButton: true
    };

    var placemarks = [];

    /*
     Create fake placemarks
     */

    for (var i1 = 1; i1 <= 20; i1++) {
        var mark1 = new ymaps.Placemark([55.76, 37.64], {
            hintContent: 'Москва! ' + i1,

            balloonHeader: 'Moscow is the capital of Russia!' + i1 + '<br>Vot tak vot!',
            balloonContentHeader: 'Moscow ' + i1,
            balloonContentBody: i1 + ' <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>'
        }, options);
        placemarks.push(mark1);
    }
    for (var i2 = 1; i2 <= 25; i2++) {
        var mark2 = new ymaps.Placemark([55.74, 37.62], {
            hintContent: 'Москва! ' + i2,

            balloonHeader: 'Moscow is the capital of Russia!' + i2 + '<br>Vot tak vot!',
            balloonContentHeader: 'Moscow ' + i2,
            balloonContentBody: i2 + ' <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>'
        }, options);
        placemarks.push(mark2);
    }
    for (var i3 = 1; i3 <= 7; i3++) {
        var mark3 = new ymaps.Placemark([55.78, 37.62], {
            hintContent: 'Москва! ' + i3,

            balloonHeader: 'Moscow is the capital of Russia!' + i3 + '<br>Vot tak vot!',
            balloonContentHeader: 'Moscow ' + i3,
            balloonContentBody: i3 + ' <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>'
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

    var clusterer = new ymaps.Clusterer({
        clusterIcons: clusterIcons,
        clusterNumbers: [10, 20],
        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #fff; font-weight: bold;">{{ properties.geoObjects.length }}</div>'),

        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonPanelMaxMapArea: 0,
        //clusterBalloonMinHeight: 370,
        //clusterBalloonMinWidth: 530,
        /*clusterBalloonContentLayout: ymaps.templateLayoutFactory.createClass([
            '<div class="map-advert-cluster">',
            '  <div class=map-advert-list>',
            '    {% for geoObject in properties.geoObjects %}',
            '      <div data-advert-id="{{ geoObject.properties.placemarkId }}">{{ geoObject.properties.balloonHeader|raw }}</div>',
            '    {% endfor %}',
            '  </div>',
            '  <div class="map-adverts">',
            '    {% for geoObject in properties.geoObjects %}',
            '      {{ geoObject.properties.balloonContentBody|raw }}',
            '    {% endfor %}',
            '  </div>',
            '</div>'
        ].join('')),*/
        clusterBalloonItemContentLayout: ymaps.templateLayoutFactory.createClass(['{{ geoObject.properties.balloonContentBody|raw }}'].join('')),
        clusterBalloonCloseButton: true
    });
    clusterer.add(placemarks);
    map.geoObjects.add(clusterer);
}