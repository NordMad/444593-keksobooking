'use strict';

// Модуль для отрисовки пина и взаимодействия с ним

(function () {
  window.pin = {
    getMarkers: function () {
      var adverts = window.data.adverts;
      var markersFragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        var newMarker = document.createElement('button');
        newMarker.style.left = parseInt(adverts[i].location.x, 10) + 'px';
        newMarker.style.top = parseInt(adverts[i].location.y, 10) + 'px';
        newMarker.className = 'map__pin';
        newMarker.innerHTML = '<img src="' + adverts[i].author.avatar + '" width="40" height="40" draggable="false">';
        newMarker.dataset.pinIndex = i;
        markersFragment.appendChild(newMarker);
      }
      return markersFragment;
    }
  };
  var map = document.querySelector('.map');
  var mapMarkers = document.querySelector('.map__pins');
  var muffin = map.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  muffin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var oldCoords = {
      x: evt.screenX,
      y: evt.screenY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.screenX - oldCoords.x,
        y: moveEvt.screenY - oldCoords.y
      };

      oldCoords = {
        x: moveEvt.screenX,
        y: moveEvt.screenY
      };

      var markerX = muffin.offsetLeft + shift.x;
      var markerY = muffin.offsetTop + shift.y;

      if (markerY < 131) {
        markerY = 131;
      }
      if (markerY > 531) {
        markerY = 531;
      }

      muffin.style.top = markerY + 'px';
      muffin.style.left = markerX + 'px';

      address.value = 'x: ' + (markerX) + ', y: ' + (markerY - 31);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.activate();
      mapMarkers.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapMarkers.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
