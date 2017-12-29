'use strict';

(function () {
  var template = document.querySelector('template');
  var cardTemplate = template.content.querySelector('.map__card');
  var offerTypeNames = window.data.offerTypeNames;

  // Записываю функцию создания шаблона объявления

  window.card = {
    cloneCardTemplate: function (advert) {
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
      for (var j = 0; j < features.length; j++) {
        popupFeatures.removeChild(features[j]);
      }
      // Создаю фрагмент с услугами из массива. Добавляю им классы
      for (j = 0; j < facilities.length; j++) {
        var featureItem = document.createElement('li');
        featureItem.className = 'feature feature--' + facilities[j];
        featureFragment.appendChild(featureItem);
      }

      // Добавляю фотографии объявления

      popupPictures.removeChild(pictureItem[0]);

      for (var i = 0; i < photos.length; i++) {
        var picture = document.createElement('li');
        popupPictures.appendChild(picture);
        picture.innerHTML = '<img src="' + photos[i] + '" style="max-width: 50px; max-height: 40px; padding-right: 4px;">';
      }

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
