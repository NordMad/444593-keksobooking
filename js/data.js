'use strict';

// Модуль, который создает данные

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // Функция рассчёта случайного числа
  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // Данные
  window.data = {
    offerTitles: [
      {
        title: 'Большая уютная квартира',
        type: 'flat'
      },
      {
        title: 'Маленькая неуютная квартира',
        type: 'flat'
      },
      {
        title: 'Огромный прекрасный дворец',
        type: 'house'
      },
      {
        title: 'Маленький ужасный дворец',
        type: 'house'
      },
      {
        title: 'Красивый гостевой домик',
        type: 'house'
      },
      {
        title: 'Некрасивый негостеприимный домик',
        type: 'house'
      },
      {
        title: 'Уютное бунгало далеко от моря',
        type: 'bungalo'
      },
      {
        title: 'Неуютное бунгало по колено в воде',
        type: 'bungalo'
      }
    ],
    offerTypeNames: {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    time: ['12:00', '13:00', '14:00'],
    featureTypes: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    adverts: [],
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };

  // Функция создания объявления
  var adverts = window.data.adverts;
  var offerTitles = window.data.offerTitles;
  var featureTypes = window.data.featureTypes;
  var time = window.data.time;

  var getAdvert = function (advertsNumber) {
    for (var i = 0; i < advertsNumber; i++) {
      var offerAddress = {
        x: window.getRandomNumber(300, 900),
        y: window.getRandomNumber(100, 500),
      };
      var randomFeatures = [];
      for (var j = 0; j < featureTypes.length; j++) {
        if (window.getRandomNumber(1, 100) > 50) {
          randomFeatures.push(featureTypes[j]);
        }
      }
      adverts[i] =
      {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': offerTitles[i].title,
          'address': offerAddress.x + ', ' + offerAddress.y,
          'price': window.getRandomNumber(1000, 1000000),
          'type': offerTitles[i].type,
          'rooms': window.getRandomNumber(1, 5),
          'guests': window.getRandomNumber(1, 8),
          'checkin': time[window.getRandomNumber(0, 1)],
          'checkout': time[window.getRandomNumber(1, 2)],
          'features': randomFeatures,
          'description': '',
          'photos': []
        },
        'location': offerAddress
      };
    }
  };
  getAdvert(8);
})();
