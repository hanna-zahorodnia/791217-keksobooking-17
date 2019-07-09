'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var StartPoints = {
    'LEFT': 570,
    'TOP': 375
  };

  var Limits = {
    TOP: 130,
    RIGHT: 1150,
    BOTTOM: 630,
    LEFT: -25
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomSelect = document.querySelector('#housing-rooms');
  var housingGuestSelect = document.querySelector('#housing-guests');

  var isActive = false;
  var pins = [];

  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pins > button:not(.map__pin--main)');
    pinsList.forEach(function (el) {
      el.remove();
    });
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    mainPin.style.left = StartPoints['LEFT'] + 'px';
    mainPin.style.top = StartPoints['TOP'] + 'px';
    removePins();
    isActive = false;
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
    mapPin.addEventListener('click', function () {

      window.card.show(pin);
      mapPin.classList.add('map__pin--active');
    });

    return mapPin;
  };

  var errorHandler = function () {
    window.result.showError();
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    offers.forEach(function (el) {
      fragment.appendChild(renderPin(el));
    });

    mapPins.appendChild(fragment);
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

  window.map = {
    getMainPinLocation: getMainPinLocation,
    deactivate: deactivate,
  };

  window.form.deactivate();
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
        window.server.load(function (data) {
          pins = data;
          renderPins(pins.slice(0, 5));
        }, errorHandler);
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

      shiftX = Math.min(shiftX, Limits.RIGHT);
      shiftX = Math.max(shiftX, Limits.LEFT);
      shiftY = Math.min(shiftY, Limits.BOTTOM);
      shiftY = Math.max(shiftY, Limits.TOP);

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

  var calculatePriceinWords = function (price) {
    var priceinWords;
    if (price < 10000) {
      priceinWords = 'low';
    } else if (price >= 10000 && price < 50000) {
      priceinWords = 'middle';
    } else if (price >= 50000) {
      priceinWords = 'high';
    }
    return priceinWords;
  };

  var checkType = function (item) {
    var selectedHousingType = housingTypeSelect.value;
    return (selectedHousingType === 'any') ? item.offer.type : item.offer.type === selectedHousingType;

  };

  var checkRooms = function (item) {
    var selectedRoomNumber = housingRoomSelect.value;
    return (selectedRoomNumber === 'any') ? true : item.offer.rooms.toString() === selectedRoomNumber;
  };

  var checkGuests = function (item) {
    return housingGuestSelect.value === 'any' ? true : item.offer.guests >= housingGuestSelect.value;
  };

  var checkPrice = function (item) {
    var selectedHousingPrice = housingPriceSelect.value;
    return (selectedHousingPrice === 'any') ? item.offer.price : calculatePriceinWords(item.offer.price) === selectedHousingPrice;
  };

  var checkFeature = function (item) {
    var checkedFeatures = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'));
    return checkedFeatures.every(function (el) {
      return item.offer.features.includes(el.value);
    });
  };

  filterForm.addEventListener('change', window.debounce(function () {
    var newPins = pins.filter(checkType)
                      .filter(checkRooms)
                      .filter(checkPrice)
                      .filter(checkGuests)
                      .filter(checkFeature)
                      .slice(0, 5);
    removePins();
    window.card.hide();
    renderPins(newPins);
  }));
})();

