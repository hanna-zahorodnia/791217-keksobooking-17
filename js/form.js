'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var OfferTypes = {
    'PALACE': 10000,
    'FLAT': 1000,
    'HOUSE': 5000,
    'BUNGALO': 0
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
  var capacityOptions = capacity.querySelectorAll('option');

  var avatarChooser = adForm.querySelector('.ad-form-header__input');
  var preview = adForm.querySelector('.ad-form-header__preview img');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var photoChooser = adForm.querySelector('.ad-form__input');
  var photoPreview = adForm.querySelector('.ad-form__photo');

  var resetBtn = document.querySelector('.ad-form__reset');

  var makeDisabled = function (items, value) {
    items.forEach(function (el) {
      var item = el;
      item.disabled = value;
    });
  };

  var deactivate = function () {
    adForm.classList.add('ad-form--disabled');
    makeDisabled(fieldsets, true);
    makeDisabled(filterOptions, true);
    makeDisabled(filterFieldset, true);
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    makeDisabled(fieldsets, false);
    makeDisabled(filterOptions, false);
    makeDisabled(filterFieldset, false);
    onChangeRoom();
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
    priceInput.placeholder = OfferTypes[selectedOptionValue.toUpperCase()];
    priceInput.min = OfferTypes[selectedOptionValue.toUpperCase()];
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
    var selectedOptionValue = parseInt(roomsSelect.value, 10);
    capacity.value = selectedOptionValue;
    if (selectedOptionValue === 100) {
      capacity.value = roomsToCapacity['100'];
    }
    var roomsArray = roomsToCapacity[selectedOptionValue];
    capacityOptions.forEach(function (el) {
      var capacityValue = parseInt(el.value, 10);
      el.disabled = roomsArray.indexOf(capacityValue) < 0 ? true : false;
    });
  };

  roomsSelect.addEventListener('change', onChangeRoom);

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  var createPhoto = function () {
    var img = document.createElement('img');
    img.width = '70';
    img.height = '70';
    return img;
  };

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var img = createPhoto();

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          img.src = reader.result;
        });

        reader.readAsDataURL(file);

        var photoBox = photoPreview.cloneNode(true);
        photoBox.appendChild(img);
        photoContainer.insertBefore(photoBox, photoPreview);
      }
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), successHandler, errorHandler);
    adForm.reset();
    deactivate();
    window.map.deactivate();
    setAddress(window.map.getMainPinLocation());
  });

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    deactivate();
    window.map.deactivate();
    setAddress(window.map.getMainPinLocation());
  });
})();
