'use strict';

window.renderPin = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  return function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);

    var pinPositionX = pin.location.x - PIN_WIDTH / 2 + 'px';
    var pinPositionY = pin.location.y - PIN_HEIGHT + 'px';
    var pinImg = pin.author.avatar;
    var pinType = pin.offer.type;

    mapPin.style.left = pinPositionX;
    mapPin.style.top = pinPositionY;
    mapPin.querySelector('img').src = pinImg;
    mapPin.querySelector('img').alt = pinType;

    return mapPin;
  };
})();

