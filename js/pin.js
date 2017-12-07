'use strict';

// Модуль для отрисовки пина и взаимодействия с ним

(function () {
  var adverts = window.data.adverts;
  window.pin = {
    getMarkers: function () {
      var markersFragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        var newMarker = document.createElement('button');
        newMarker.style.left = parseInt(adverts[i].location.x, 10) + 'px';
        newMarker.style.top = parseInt(adverts[i].location.y + 40, 10) + 'px';
        newMarker.className = 'map__pin';
        newMarker.innerHTML = '<img src="' + adverts[i].author.avatar + '" width="40" height="40" draggable="false">';
        newMarker.dataset.pinIndex = i;
        markersFragment.appendChild(newMarker);
      }
      return markersFragment;
    }
  };
})();
