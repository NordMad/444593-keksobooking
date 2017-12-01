'use strict';

// 1) Создаю массив с объявлениями

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var offerTitles = [
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
];

var offerTypeNames = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var time = ['12:00', '13:00', '14:00'];

var featureTypes = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var adverts = [];
var getAdverts = function (advertsNumber) {
  for (var b = 0; b < advertsNumber; b++) {
    var offerAddress = {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500),
    };
    var randomFeatures = [];
    for (var i = 0; i < featureTypes.length; i++) {
      if (getRandomNumber(1, 100) > 50) {
        randomFeatures.push(featureTypes[i]);
      }
    }
    adverts[b] =
    {
      'author': {
        'avatar': 'img/avatars/user0' + (b + 1) + '.png'
      },
      'offer': {
        'title': offerTitles[b].title,
        'address': offerAddress.x + ', ' + offerAddress.y,
        'price': getRandomNumber(1000, 1000000),
        'type': offerTitles[b].type,
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
};

getAdverts(8);

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
  cardElement.querySelector('h4').textContent = offerTypeNames[advert.offer.type];
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