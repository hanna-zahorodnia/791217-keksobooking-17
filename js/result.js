'use strict';
(function () {
  var ESC_BUTTON = 27;

  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var messageClickHandler = function () {
    close();
  };

  var restartClickHandler = function (evt) {
    evt.stopPropagation();
    close();
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      close();
    }
  };

  var showSuccess = function () {
    var successPage = successPageTemplate.cloneNode(true);
    main.appendChild(successPage);
    document.addEventListener('keydown', escPressHandler);
    successPage.addEventListener('click', messageClickHandler);
  };

  var showError = function () {
    var errorPage = errorPageTemplate.cloneNode(true);
    var restartBtn = errorPage.querySelector('.error__button');
    main.appendChild(errorPage);

    document.addEventListener('keydown', escPressHandler);
    errorPage.addEventListener('click', messageClickHandler);
    restartBtn.addEventListener('click', restartClickHandler);
  };

  var close = function () {
    var result = main.querySelector('.success') || main.querySelector('.error');
    if (result.className === 'error') {
      window.map.deactivate();
      window.form.deactivate();
    }
    main.removeChild(result);
    document.removeEventListener('keydown', escPressHandler);
  };

  window.result = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
