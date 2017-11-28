'use strict';

// 1) Создаю массив с объявлениями

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var adverts = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },
    'offer': {
      'title': 'Большая уютная квартира',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'flat',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 8),
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking', 'washer', 'elevator'],
      'description': '',
      'photos': []
    },

    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },
    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'flat',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'washer'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },
    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'house',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },
    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'house',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },
    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'house',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking', 'conditioner'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },
    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'house',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },
    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'bungalo',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },
    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '',
      'price': getRandomNumber(1000, 1000000),
      'type': 'bungalo',
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi'],
      'description': '',
      'photos': []
    },
    'location': ''
  },
];

for (var a = 0; a < adverts.length; a++) {
  var x = getRandomNumber(300, 900);
  var y = getRandomNumber(100, 500);
  adverts[a].offer.address = x + ', ' + y;
  adverts[a].location = {
    'x': x,
    'y': y
  };
}

// 2) У блока .map убераю класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3) Создаю метки на карте

var markersFragment = document.createDocumentFragment();
var mapMarkers = document.querySelector('.map__pins');
var muffinMarker = document.querySelector('.map__pin--main');

for (var i = 0; i < adverts.length; i++) {
  var newMarker = document.createElement('button');
  newMarker.style.left = parseInt(adverts[i].location.x, 10) + 'px';
  newMarker.style.top = parseInt(adverts[i].location.y + 40, 10) + 'px';
  newMarker.className = 'map__pin';
  newMarker.innerHTML = '<img src="' + adverts[i].author.avatar + '" width="40" height="40" draggable="false">';
  markersFragment.appendChild(newMarker);
}

// 4) Отрисовываю фрагмент markersFragment в .map__pins

mapMarkers.insertBefore(markersFragment, muffinMarker);

// 5) Создаю шаблон объявления

var template = document.querySelector('template');
var cardTemplate = template.content.querySelector('.map__card');
var mapFilters = document.querySelector('.map__filters-container');

// Записываю функцию создания шаблона

var cloneCardTemplate = function (advert) {
  var cardElement = cardTemplate.cloneNode(true);
  var offerType = advert.offer.type;
  var p = cardElement.querySelectorAll('p');
  var facilities = advert.offer.features;
  var popupFeatures = cardElement.querySelector('.popup__features');
  var features = popupFeatures.querySelectorAll('li');
  var featureFragment = document.createDocumentFragment();
  // Вывожу заголовок объявления
  cardElement.querySelector('h3').textContent = advert.offer.title;
  // Вывожу адрес
  cardElement.querySelector('small').innerHTML = advert.offer.address;
  // Вывожу цену
  cardElement.querySelector('.popup__price').innerHTML = advert.offer.price + '&#x20bd;/ночь';
  // Тип жилья
  if (offerType === 'flat') {
    offerType = 'Квартира';
    if (offerType === 'house') {
      offerType = 'Дом';
    } else {
      offerType = 'Бунгало';
    }
  }
  // Количество комнат и гостей
  p[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  // Время заезда и выезда
  p[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  // Удаляю все клонированные li-шки с услугами
  for (var j = 0; j < features.length; j++) {
    popupFeatures.removeChild(features[j]);
  }
  // Создаю фрагмент с услугами из массива. Добавляю им классы
  for (j = 0; j < facilities.length; j++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'feature feature--' + facilities[j];
    featureFragment.appendChild(featureItem);
  }
  // Добавляю шаблон в шаблон))))
  popupFeatures.appendChild(featureFragment);
  // Описание объекта недвижимости
  p[4].textContent = advert.offer.description;
  // Добавляю путь к изображению аватарки автора
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  return cardElement;
};
// Вставляю первый по порядку созданный шаблон в .map, перед блоком .map__filters-container
map.insertBefore(cloneCardTemplate(adverts[0]), mapFilters);
