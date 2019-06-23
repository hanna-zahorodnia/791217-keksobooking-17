'use strict';
(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var OFFER_TYPES = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var mainPin = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterOptions = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var typeSelect = document.querySelector('#type');

  var arrival = document.querySelector('#timein');
  var departure = document.querySelector('#timeout');

  var makeDisabled = function (items, value) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.disabled = value;
    }
  };

  var deactivate = function () {
    makeDisabled(fieldsets, true);
    makeDisabled(filterOptions, true);
    makeDisabled(filterFieldset, true);
  };

  var activate = function () {
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

  var setAddress = function () {
    var coordinates = getMainPinLocation();
    addressField.value = coordinates.x + ', ' + coordinates.y;
  };

  window.form = {
    deactivate: deactivate,
    activate: activate,
    setAddress: setAddress
  };

  var onChangeType = function () {
    var priceInput = document.querySelector('#price');
    var selectedOptionValue = typeSelect.value;
    priceInput.placeholder = OFFER_TYPES[selectedOptionValue];
    priceInput.min = OFFER_TYPES[selectedOptionValue];
  };

  typeSelect.addEventListener('change', onChangeType);

  var onChangeTimeArrival = function () {
    departure.options.selectedIndex = arrival.options.selectedIndex;
  };

  var onChangeTimeDeparture = function () {
    arrival.options.selectedIndex = departure.options.selectedIndex;
  };

  arrival.addEventListener('change', onChangeTimeArrival);
  departure.addEventListener('change', onChangeTimeDeparture);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.showSuccess();
  });
})();
