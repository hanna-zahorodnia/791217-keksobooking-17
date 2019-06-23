'use strict';
(function () {
  var limits = {
    top: 130,
    right: 1150,
    bottom: 630,
    left: -25
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var mapPins = document.querySelector('.map__pins');

  var isActive = false;

  var locationNumber = 8;

  var deactivatePage = function () {
    window.form.deactivate();
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.activate();
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(window.renderPin(offers[i]));
    }

    mapPins.appendChild(fragment);
  };

  deactivatePage();

  window.form.setAddress();

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
        renderPins(window.data.generateAds(locationNumber));
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

      shiftX = Math.min(shiftX, limits.right);
      shiftX = Math.max(shiftX, limits.left);
      shiftY = Math.min(shiftY, limits.bottom);
      shiftY = Math.max(shiftY, limits.top);

      mainPin.style.left = shiftX + 'px';
      mainPin.style.top = shiftY + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
