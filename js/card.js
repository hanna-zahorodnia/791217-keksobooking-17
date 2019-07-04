'use strict';
(function () {
  var ESC_BUTTON = 27;

  var housingTypetoTranslated = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var main = document.querySelector('main');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var filters = map.querySelector('.map__filters-container');

  main.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      hide();
    }
  });

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

  var addPhotos = function (obj, arr) {
    var photos = obj.querySelector('.popup__photos');

    for (var i = 0; i < arr.length; i++) {
      var photo = obj.querySelector('.popup__photo').cloneNode(true);
      photo.src = arr[i];
      photos.appendChild(photo);
    }
    photos.removeChild(photos.children[0]);
  };

  var render = function (card) {
    var offerCard = cardTemplate.cloneNode(true);
    offerCard.querySelector('.popup__avatar').src = card.author.avatar;
    offerCard.querySelector('.popup__title').textContent = card.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = card.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    offerCard.querySelector('.popup__type').textContent = housingTypetoTranslated[card.offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    getOfferFeatures(offerCard, card.offer.features);
    offerCard.querySelector('.popup__description').textContent = card.offer.description;
    addPhotos(offerCard, card.offer.photos);

    return offerCard;
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      hide();
    }
  };

  var hide = function () {
    var cardElement = main.querySelector('.map__card');
    if (cardElement) {
      document.removeEventListener('keydown', onCardEscPress);
      cardElement.remove();
      var activePin = map.querySelector('.map__pin--active');
      activePin.classList.remove('map__pin--active');
    }
  };

  var show = function (data) {
    hide();
    map.insertBefore(render(data), filters);
    document.addEventListener('keydown', onCardEscPress);
  };

  window.card = {
    show: show
  };
})();

