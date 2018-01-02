'use strict';

(function () {
  var URL_LOAD = 'https://1510.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad();
        } else {
          onError('Произошла ошибка ' + xhr.status);
        }
      });

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
})();
