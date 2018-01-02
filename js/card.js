'use strict';

(function () {
  var template = document.querySelector('template');
  var cardTemplate = template.content.querySelector('.map__card');
  var offerTypeNames = window.data.offerTypeNames;

  // Записываю функцию создания шаблона объявления

  window.card = {
    cloneTemplate: function (advert) {
      var cardElement = cardTemplate.cloneNode(true);
      var p = cardElement.querySelectorAll('p');
      var facilities = advert.offer.features;
      var photos = advert.offer.photos;
      var popupFeatures = cardElement.querySelector('.popup__features');
      var features = popupFeatures.querySelectorAll('li');
      var popupPictures = cardElement.querySelector('.popup__pictures');
      var pictureItem = popupPictures.querySelectorAll('li');
      var featureFragment = document.createDocumentFragment();
      // Вывожу заголовок объявления
      cardElement.querySelector('h3').textContent = advert.offer.title;
      // Вывожу адрес
      cardElement.querySelector('small').textContent = advert.offer.address;
      // Вывожу цену
      cardElement.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD' + '/ночь';
      // Тип жилья
      cardElement.querySelector('h4').textContent = offerTypeNames[advert.offer.type];
      // Количество комнат и гостей
      p[2].textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      // Время заезда и выезда
      p[3].textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
      // Удаляю все клонированные li-шки с услугами
      features.forEach(function (it) {
        popupFeatures.removeChild(it);
      });
      // Создаю фрагмент с услугами из массива. Добавляю им классы
      facilities.forEach(function (it) {
        var featureItem = document.createElement('li');
        featureItem.className = 'feature feature--' + it;
        featureFragment.appendChild(featureItem);
      });
      // Добавляю фотографии объявления
      popupPictures.removeChild(pictureItem[0]);
      photos.forEach(function (it) {
        var photoItem = pictureItem[0].cloneNode(true);
        var picture = photoItem.querySelector('img');
        picture.src = it;
        picture.style = 'max-width: 50px; max-height: 40px; padding-right: 4px;';
        popupPictures.appendChild(photoItem);
      });
      // Добавляю шаблон в шаблон))))
      popupFeatures.appendChild(featureFragment);
      // Описание объекта недвижимости
      p[4].textContent = advert.offer.description;
      // Добавляю путь к изображению аватарки автора
      cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
      return cardElement;
    }
  };
})();
