'use strict';
(function () {
  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showSuccess = function () {
    var successPage = successPageTemplate.cloneNode(true);
    main.appendChild(successPage);
  };

  var showError = function () {
    var errorPage = errorPageTemplate.cloneNode(true);
    main.appendChild(errorPage);
  };

  window.result = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
