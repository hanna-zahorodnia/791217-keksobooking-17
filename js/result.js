'use strict';
(function () {
  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');

  window.showSuccess = function () {
    var successPage = successPageTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(successPage);
  };
})();
