'use strict';
(function () {

  var OFFER_TYPES = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var START_POINTS = {
    'left': 570,
    'top': 375
  };

  var roomsToCapacity = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterOptions = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var typeSelect = document.querySelector('#type');

  var arrival = document.querySelector('#timein');
  var departure = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var resetBtn = document.querySelector('.ad-form__reset');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

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

  var setAddress = function (coordinates) {
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

  var successHandler = function () {
    window.result.showSuccess();
  };

  var errorHandler = function () {
    window.result.showError();
  };

  var onChangeRoom = function () {
    var selectedOptionValue = parseInt(roomsSelect[roomsSelect.selectedIndex].value, 10);
    capacity.value = selectedOptionValue;
    if (roomsSelect.selectedIndex === 3) {
      capacity.value = roomsToCapacity['100'];
    }
    var roomsArray = roomsToCapacity[selectedOptionValue];
    for (var i = 0; i < capacity.length; i++) {
      var capacityValue = parseInt(capacity[i].value, 10);
      if (roomsArray.indexOf(capacityValue) < 0) {
        capacity[i].disabled = true;
      } else {
        capacity[i].disabled = false;
      }
    }
  };

  roomsSelect.addEventListener('change', onChangeRoom);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), successHandler, errorHandler);
  });


  var isActive = true;

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    if (isActive) {
      adForm.classList.add('ad-form--disabled');
      map.classList.add('map--faded');
    }
    isActive = false;
    mainPin.style.left = START_POINTS['left'] + 'px';
    mainPin.style.top = START_POINTS['top'] + 'px';
    deactivate();
    setAddress(window.map.getMainPinLocation());
  });
})();
