'use strict';

// Модуль, который работает с формой объявления

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var time = window.data.time;

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  // Синхронизирую поля «время заезда» и «время выезда»

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, time, time, syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, time, time, syncValues);
  });

  // Значение поля «Тип жилья» синхронизирую с минимальной ценой

  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var typeNames = ['flat', 'bungalo', 'palace', 'house'];
  var typePrices = [1000, 0, 10000, 5000];

  window.synchronizeFields(type, price, typeNames, typePrices, syncValueWithMin);

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, typeNames, typePrices, syncValueWithMin);
  });

  // Количество комнат связываю с количеством гостей

  var rooms = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  capacity.value = rooms.value;

  rooms.addEventListener('change', function () {
    if (rooms.value) {
      capacity.value = rooms.value;
    }
    if (rooms.value === '100') {
      capacity.value = 0;
    }
  });

  capacity.addEventListener('change', function () {
    if (capacity.value > rooms.value) {
      capacity.setCustomValidity('Количество комнат не должно превышать количество гостей');
      capacity.invalid = true;
    } else {
      capacity.setCustomValidity('');
      capacity.invalid = false;
    }
  });

  // Не валидные поля выделяю красной рамкой

  var formInput = noticeForm.querySelectorAll('input');

  for (var i = 0; i < formInput.length; i++) {
    formInput[i].addEventListener('invalid', function (evt) {
      evt.target.style = 'border-color: red';
    });
  }
})();
