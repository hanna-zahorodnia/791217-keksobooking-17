'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var limits = {
    top: 130,
    right: 1150,
    bottom: 630,
    left: -25
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var isActive = false;

  // var locationNumber = 8;

  var deactivatePage = function () {
    window.form.deactivate();
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.activate();
  };

  var renderPin = function (pin) {
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

  var renderPins = function () {
    window.load(function (offers) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < offers.length; i++) {
        fragment.appendChild(renderPin(offers[i]));
      }
      mapPins.appendChild(fragment);
    });
  };

  var getMainPinLocation = function () {
    var mainPinPositionY = parseInt(mainPin.style.top, 10) - MAIN_PIN_HEIGHT;
    var mainPinPositionX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var mainPinLocation = {
      'x': mainPinPositionX,
      'y': mainPinPositionY
    };
    return mainPinLocation;
  };

  deactivatePage();

  window.form.setAddress(getMainPinLocation());

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!isActive) {
        activatePage();
        renderPins();
      }
      isActive = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftX = (mainPin.offsetLeft - shift.x);
      var shiftY = (mainPin.offsetTop - shift.y);

      shiftX = Math.min(shiftX, limits.right);
      shiftX = Math.max(shiftX, limits.left);
      shiftY = Math.min(shiftY, limits.bottom);
      shiftY = Math.max(shiftY, limits.top);

      mainPin.style.left = shiftX + 'px';
      mainPin.style.top = shiftY + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(getMainPinLocation());

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
