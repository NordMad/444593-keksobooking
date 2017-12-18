'use strict';

// Модуль, который создает данные

(function () {
  /*
  // Функция рассчёта случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  */
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
  /*
  var offerTitles = window.data.offerTitles;
  var featureTypes = window.data.featureTypes;
  var time = window.data.time;

  // Функция создания объявления

  var getAdverts = function (advertsNumber) {
    var adverts = [];
    for (var i = 0; i < advertsNumber; i++) {
      var offerAddress = {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(100, 500),
      };
      var randomFeatures = [];
      for (var j = 0; j < featureTypes.length; j++) {
        if (getRandomNumber(1, 100) > 50) {
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
          'price': getRandomNumber(1000, 1000000),
          'type': offerTitles[i].type,
          'rooms': getRandomNumber(1, 5),
          'guests': getRandomNumber(1, 8),
          'checkin': time[getRandomNumber(0, 1)],
          'checkout': time[getRandomNumber(1, 2)],
          'features': randomFeatures,
          'description': '',
          'photos': []
        },
        'location': offerAddress
      };
    }
    return adverts;
  };
  // window.data.adverts = getAdverts(8);
  */
})();
