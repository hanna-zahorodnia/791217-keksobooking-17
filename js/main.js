'use strict';

var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_TOP_POINT = 130;
var MAP_BOTTOM_POINT = 630;
var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var locationNumber = 8;
var ads = [];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getrandomOfferType = function () {
  var randomType = Math.floor(Math.random() * OFFER_TYPES.length);
  return OFFER_TYPES[randomType];
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
  for (var i = 1; i <= count; i++) {
    var ad = createAd(i);
    ads.push(ad);
  }
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

generateAds(locationNumber);
renderPins(ads);
