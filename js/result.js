'use strict';
(function () {
  var ESC_BUTTON = 27;
  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  function messageClickHandler() {
    close();
  }

  function restartClickHandler(evt) {
    evt.stopPropagation();
    close();
  }

  function EscPressHandler(evt) {
    if (evt.keyCode === ESC_BUTTON) {
      close();
    }
  }

  var showSuccess = function () {
    var successPage = successPageTemplate.cloneNode(true);
    main.appendChild(successPage);
    document.addEventListener('keydown', EscPressHandler);
    successPage.addEventListener('click', messageClickHandler);
  };

  var showError = function () {
    var errorPage = errorPageTemplate.cloneNode(true);
    var restartBtn = errorPage.querySelector('.error__button');
    main.appendChild(errorPage);

    document.addEventListener('keydown', EscPressHandler);
    errorPage.addEventListener('click', messageClickHandler);
    restartBtn.addEventListener('click', restartClickHandler);
  };

  function close() {
    var result = main.querySelector('.success') || main.querySelector('.error');
    if (result.className === 'error') {
      window.map.deactivateMap();
      window.form.deactivate();
    }
    main.removeChild(result);
    document.removeEventListener('keydown', EscPressHandler);
  }

  window.result = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
