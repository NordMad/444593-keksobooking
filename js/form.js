'use strict';

// Модуль, который работает с формой объявления

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  // Синхронизирую поля «время заезда» и «время выезда»
  timeIn.addEventListener('change', function () {

    if (timeIn.value) {
      timeOut.value = timeIn.value;
    }
  });

  timeOut.addEventListener('change', function () {
    if (timeOut.value) {
      timeIn.value = timeOut.value;
    }
  });

  // Значение поля «Тип жилья» синхронизирую с минимальной ценой

  var type = noticeForm.querySelector('#type');
  var typeOptions = type.querySelectorAll('option');
  var price = noticeForm.querySelector('#price');
  var typePrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  price.min = typePrices[type.value];

  type.addEventListener('change', function () {
    var typeValue = type.value;
    for (var i = 0; i < typeOptions.length; i++) {
      price.min = typePrices[typeValue];
    }
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
