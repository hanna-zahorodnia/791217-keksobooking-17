'use strict';

var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_TOP_POINT = 130;
var MAP_BOTTOM_POINT = 630;
var OFFER_TYPES = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

var locationNumber = 8;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var addressField = adForm.querySelector('#address');

var filterForm = document.querySelector('.map__filters');
var filterOptions = filterForm.querySelectorAll('select');
var filterFieldset = filterForm.querySelectorAll('fieldset');

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var typeSelect = document.querySelector('#type');

var arrival = document.querySelector('#timein');
var departure = document.querySelector('#timeout');

var successPageTemplate = document.querySelector('#success').content.querySelector('.success');

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

var getrandomOfferType = function () {
  var randomType = Math.floor(Math.random() * Object.keys(OFFER_TYPES).length);
  return Object.keys(OFFER_TYPES)[randomType];
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

var getAvatar = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

var getRandomPosition = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createAd = function (number) {
  return {
    'author': {
      'avatar': getAvatar(number),
    },

    'offer': {
      'type': getrandomOfferType(),
    },

    'location': {
      'x': getRandomPosition(0, MAP_WIDTH),
      'y': getRandomPosition(MAP_TOP_POINT, MAP_BOTTOM_POINT),
    }
  };
};

var generateAds = function (count) {
  var data = [];
  for (var i = 1; i <= count; i++) {
    var ad = createAd(i);
    data.push(ad);
  }
  return data;
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

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  mapPins.appendChild(fragment);
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

deactivatePage();

var ads = generateAds(locationNumber);
var coordinates = getMainPinLocation();
addressField.value = coordinates.x + ', ' + coordinates.y;

mainPin.addEventListener('click', function () {
  if (!isActive) {
    activatePage();
    renderPins(ads);
  }
  isActive = true;
});

var showSuccess = function () {
  var successPage = successPageTemplate.cloneNode(true);
  var main = document.querySelector('main');
  main.appendChild(successPage);
};

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  showSuccess();
});
