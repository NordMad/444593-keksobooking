'use strict';

// Модуль, который создает данные

(function () {

  // Данные
  window.data = {
    offerTypeNames: {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: crimson; border: 4px solid white; border-radius: 7px; color: white; box-shadow: 0 0 10px 3px black';
      node.style.position = 'fixed';
      node.style.width = '350px';
      node.style.left = '40.5%';
      node.style.top = '42%';
      node.style.fontSize = '35px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  var successHandler = function (data) {
    window.data.adverts = data;
  };

  window.backend.load(successHandler, window.data.errorHandler);
})();
