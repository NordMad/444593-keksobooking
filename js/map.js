'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Создаю массив с объявлениями

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

// У блока .map убераю класс .map--faded

var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
// Добавляю полям формы атрибут disabled
for (var i = 0; i < noticeFormFieldset.length; i++) {
  noticeFormFieldset[i].disabled = true;
}

// Макркеры на карте

var markersFragment = document.createDocumentFragment();
var mapMarkers = document.querySelector('.map__pins');
var muffin = document.querySelector('.map__pin--main');

for (i = 0; i < adverts.length; i++) {
  var newMarker = document.createElement('button');
  newMarker.style.left = parseInt(adverts[i].location.x, 10) + 'px';
  newMarker.style.top = parseInt(adverts[i].location.y + 40, 10) + 'px';
  newMarker.className = 'map__pin';
  newMarker.innerHTML = '<img src="' + adverts[i].author.avatar + '" width="40" height="40" draggable="false">';
  newMarker.dataset.pinIndex = i;
  markersFragment.appendChild(newMarker);
}

// Создаю шаблон объявления

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

var activateMap = function () {
  // показываю карту
  map.classList.remove('map--faded');
  // размещаю маркеры на карте
  mapMarkers.insertBefore(markersFragment, muffin);
  // делаю форму ...
  noticeForm.classList.remove('notice__form--disabled');
  // ...и её поля активными
  for (i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].disabled = false;
  }
};
// Добавляю обработчик события отпущенной кнопки мыши на кекс-маркере
muffin.addEventListener('mouseup', function () {
  activateMap();
});
// Дублирую обработчик для клавиши Enter
muffin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});

// Показ/скрытие карточки объявления .popup

var mapPopup = null;
var clickedElement = null;
var popupCloseButton = null;
// Функция закрытия объявления .popup
var closePopup = function () {
  if (mapPopup) {
    map.removeChild(mapPopup);
    mapPopup = null;
  }
  if (clickedElement) {
    clickedElement.classList.remove('map__pin--active');
    clickedElement = null;
  }
};
// Функция. При нажатии на любой из элементов map__pin, добавляю ему класс map__pin--active и показываю соответствующий элемент .popup
var toggleMarkers = function (target) {
  if (target.classList.contains('map__pin')) {
    closePopup();
    clickedElement = target;
    clickedElement.classList.toggle('map__pin--active');
    var pinIndex = clickedElement.dataset.pinIndex;
    if (pinIndex) {
      var advert = adverts[pinIndex];
      mapPopup = cloneCardTemplate(advert);
      popupCloseButton = mapPopup.querySelector('.popup__close');
      map.insertBefore(mapPopup, mapFilters);
    }
  } else {
    return;
  }
};
// Добавляю обработчик события 'клик мыши' на mapMarkers и вызываю в нём фуикцию toggleMarkers
mapMarkers.addEventListener('click', function (evt) {
  var targetParent = evt.target.parentNode;
  toggleMarkers(targetParent);
});

// Закрытие .popup по клику мыши
document.addEventListener('click', function (evt) {
  if (evt.target === popupCloseButton) {
    closePopup();
  }
});
// Дублирую обработчик на mapMarkers для клавиши Enter и закрытие .popup для ESC
mapMarkers.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    toggleMarkers(evt.target);
  } else if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

// Синхронизирую поля «время заезда» и «время выезда»

var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');

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
  for (i = 0; i < typeOptions.length; i++) {
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

for (i = 0; i < formInput.length; i++) {
  formInput[i].addEventListener('invalid', function (evt) {
    evt.target.style = 'border-color: red';
  });
}
