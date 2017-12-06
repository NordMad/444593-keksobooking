'use strict';

// Модуль, который работает с картой.

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  // Добавляю полям формы атрибут disabled
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].disabled = true;
  }

  var mapFilters = document.querySelector('.map__filters-container');
  var mapMarkers = document.querySelector('.map__pins');
  var muffin = document.querySelector('.map__pin--main');
  var pins = window.pin.getMarkers();
  var adverts = window.data.adverts;
  var popupCloseButton = null;
  var mapPopup = null;
  var clickedElement = null;

  window.map = {
    // Активировать карту
    activateMap: function () {
      // показываю карту
      map.classList.remove('map--faded');
      // размещаю маркеры на карте
      mapMarkers.insertBefore(pins, muffin);
      // делаю форму ...
      noticeForm.classList.remove('notice__form--disabled');
      // ...и её поля активными
      for (i = 0; i < noticeFormFieldset.length; i++) {
        noticeFormFieldset[i].disabled = false;
      }
    },
    // Функция закрытия объявления .popup
    closePopup: function () {
      if (mapPopup) {
        map.removeChild(mapPopup);
        mapPopup = null;
      }
      if (clickedElement) {
        clickedElement.classList.remove('map__pin--active');
        clickedElement = null;
      }
    },
    // Функция. При нажатии на любой из элементов map__pin, добавляю ему класс map__pin--active и показываю соответствующий элемент .popup
    toggleMarkers: function (target) {
      if (target.classList.contains('map__pin')) {
        window.map.closePopup();
        clickedElement = target;
        clickedElement.classList.toggle('map__pin--active');
        var pinIndex = clickedElement.dataset.pinIndex;
        if (pinIndex) {
          var advert = adverts[pinIndex];
          mapPopup = window.card.cloneCardTemplate(advert);
          popupCloseButton = mapPopup.querySelector('.popup__close');
          map.insertBefore(mapPopup, mapFilters);
        }
      } else {
        return;
      }
    }
  };

  var escEvent = window.data.isEscEvent;
  var enterEvent = window.data.isEnterEvent;
  // Добавляю обработчик события отпущенной кнопки мыши на кекс-маркере
  muffin.addEventListener('mouseup', function (evt) {
    escEvent(evt, window.map.activateMap());
  });

  // Дублирую обработчик для клавиши Enter
  muffin.addEventListener('keydown', function (evt) {
    enterEvent(evt, window.map.activateMap());
  });

  // Добавляю обработчик события 'клик мыши' на mapMarkers и вызываю в нём фуикцию toggleMarkers
  mapMarkers.addEventListener('click', function (evt) {
    var targetParent = evt.target.parentNode;
    window.map.toggleMarkers(targetParent);
  });
  // Закрытие .popup по клику мыши
  document.addEventListener('click', function (evt) {
    if (evt.target === popupCloseButton) {
      window.map.closePopup();
    }
  });
  // Дублирую обработчик на mapMarkers для клавиши Enter и закрытие .popup для ESC
  mapMarkers.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.toggleMarkers(evt.target);
    } else if (evt.keyCode === ESC_KEYCODE) {
      window.map.closePopup();
    }
  });
})();
