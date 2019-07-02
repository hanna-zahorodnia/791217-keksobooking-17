'use strict';

(function () {
  var MAP_WIDTH = 1200;
  var MAP_TOP_POINT = 130;
  var MAP_BOTTOM_POINT = 630;

  var OFFER_TYPES = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };


  var ESC_BUTTON = 27;

  var housingTypetoTranslated = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  /* var featuresToClasses = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  }; */

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var main = document.querySelector('main');
  main.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      deleteCard();
    }
  });

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

  var getOfferFeatures = function (obj, arr) {
    var features = obj.querySelector('.popup__features');

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    for (var i = 0; i < arr.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
      features.appendChild(featureItem);
    }
  };

  var renderCard = function (card) {
    var offerCard = cardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = card.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = card.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    offerCard.querySelector('.popup__type').textContent = housingTypetoTranslated[card.offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    getOfferFeatures(offerCard, card.offer.features);
    offerCard.querySelector('.popup__description').textContent = card.offer.description;

    return offerCard;
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

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      deleteCard();
    }
  };

  var deleteCard = function () {
    var card = document.querySelector('main .map__card');

    if (main.querySelectorAll('.map__card').length === 1) {
      card.remove();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var addCard = function (сard) {
    if (main.querySelectorAll('article').length < 1) {
      map.appendChild(сard);
    }
    document.addEventListener('keydown', onCardEscPress);
  };

  window.data = {
    generateAds: generateAds,
    renderCard: renderCard,
    deleteCard: deleteCard,
    addCard: addCard
  };
})();
