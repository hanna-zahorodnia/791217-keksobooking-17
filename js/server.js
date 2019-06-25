'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var dataURL = 'https://js.dump.academy/keksobooking/data';

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000; // 10s
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', dataURL);
    xhr.send();
  };

  window.server = {
    upload: upload,
    load: load
  };
})();
