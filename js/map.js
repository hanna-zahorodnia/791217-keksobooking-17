'use strict';
(function () {
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

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var filterForm = document.querySelector('.map__filters');
  var filterOptions = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelectorAll('fieldset');

  var mapPins = document.querySelector('.map__pins');

  var isActive = false;

  var makeDisabled = function (items, value) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.disabled = value;
    }
  };

  var deactivatePage = function () {
    makeDisabled(fieldsets, true);
    makeDisabled(filterOptions, true);
    makeDisabled(filterFieldset, true);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    makeDisabled(fieldsets, false);
    makeDisabled(filterOptions, false);
    makeDisabled(filterFieldset, false);
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

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.renderPin(offers[i]));
    }

    mapPins.appendChild(fragment);
  };

  deactivatePage();

  var coordinates = getMainPinLocation();
  addressField.value = coordinates.x + ', ' + coordinates.y;

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
        renderPins(window.generateAds);
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

      coordinates = getMainPinLocation();
      addressField.value = coordinates.x + ', ' + coordinates.y;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
