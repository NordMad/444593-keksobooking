'use strict';

(function () {
  window.showCard = function (advert, container, insertBefore, onCloseFunction) {
    var mapPopup = window.card.cloneCardTemplate(advert);
    var popupCloseButton = mapPopup.querySelector('.popup__close');
    if (insertBefore === null) {
      container.appendChild(mapPopup);
    } else {
      container.insertBefore(mapPopup, insertBefore);
    }
    popupCloseButton.addEventListener('click', function () {
      if (onCloseFunction) {
        onCloseFunction();
      } else {
        container.removeChild(mapPopup);
      }
    });
    return mapPopup;
  };
})();
