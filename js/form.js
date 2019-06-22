'use strict';
(function () {
  var OFFER_TYPES = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var adForm = document.querySelector('.ad-form');

  var typeSelect = document.querySelector('#type');

  var arrival = document.querySelector('#timein');
  var departure = document.querySelector('#timeout');

  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');

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

  var showSuccess = function () {
    var successPage = successPageTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(successPage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    showSuccess();
  });
})();
