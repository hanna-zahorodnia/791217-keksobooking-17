'use strict';

window.generateAds = (function () {
  var MAP_WIDTH = 1200;
  var MAP_TOP_POINT = 130;
  var MAP_BOTTOM_POINT = 630;

  var OFFER_TYPES = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var locationNumber = 8;

  var getAvatar = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  var getRandomPosition = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getrandomOfferType = function () {
    var randomType = Math.floor(Math.random() * Object.keys(OFFER_TYPES).length);
    return Object.keys(OFFER_TYPES)[randomType];
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

  var ads = generateAds(locationNumber);
  return ads;
})();
