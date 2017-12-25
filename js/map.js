'use strict';

// Модуль, который работает с картой.

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  // Добавляю полям формы атрибут disabled
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].disabled = true;
  }
  var mapMarkers = document.querySelector('.map__pins');
  var clickedElement = null;
  var mapPopup = null;

  window.map = {
    // Активировать карту
    activate: function () {
      // показываю карту
      map.classList.remove('map--faded');
      // размещаю маркеры на карте
      window.refreshFilteredAdverts();
      // делаю форму ...
      noticeForm.classList.remove('notice__form--disabled');
      // ...и её поля активными
      for (i = 0; i < noticeFormFieldset.length; i++) {
        noticeFormFieldset[i].disabled = false;
      }
    },
    closePopup: function () {
      if (mapPopup) {
        map.removeChild(mapPopup);
        mapPopup = null;
      }
      window.map.deactivateClickedElement();
    },
    deactivateClickedElement: function () {
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
          var advert = window.data.filteredAdverts[pinIndex];
          mapPopup = window.showCard(advert, map, mapFilters, window.map.closePopup);
        }
      } else {
        return;
      }
    }
  };

  // Добавляю обработчик события 'клик мыши' на mapMarkers и вызываю в нём фуикцию toggleMarkers

  mapMarkers.addEventListener('click', function (evt) {
    var targetParent = evt.target.parentNode;
    window.map.toggleMarkers(targetParent);
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
