'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapMarkers = map.querySelector('.map__pins');
  var muffin = map.querySelector('.map__pin--main');

  var mapFilters = map.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var housingFeatures = map.querySelector('.features');
  var features = housingFeatures.querySelectorAll('input');

  var getMarkers = function (adverts) {
    var markersFragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var newMarker = document.createElement('button');
      var markerImage = document.createElement('img');
      newMarker.style.left = parseInt(adverts[i].location.x, 10) + 'px';
      newMarker.style.top = parseInt(adverts[i].location.y, 10) + 'px';
      newMarker.className = 'map__pin';
      newMarker.dataset.pinIndex = i;
      markerImage.src = adverts[i].author.avatar;
      markerImage.style = 'width: 40px; height: 40px;';
      markerImage.draggable = false;
      newMarker.appendChild(markerImage);
      markersFragment.appendChild(newMarker);
    }
    return markersFragment;
  };
  var removeMarkers = function () {
    var markers = document.querySelectorAll('.map__pin');
    for (var i = 0; i < markers.length - 1; i++) {
      mapMarkers.removeChild(markers[i]);
    }
  };

  var testAdvertFeatures = function (filter, facilities) {
    if (filter.length === 0) {
      return true;
    }

    for (var i = 0; i < filter.length; i++) {
      if (!facilities.includes(filter[i])) {
        return false;
      }
    }

    return true;
  };

  var prices = {
    any: [0, Number.MAX_VALUE],
    low: [0, 10000],
    middle: [10000, 50000],
    high: [50000, Number.MAX_VALUE]
  };

  window.pin = {
    debounce: function (func, delay, timer) {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        func();
      }, delay);
    },
    refreshFilteredAdverts: function () {
      var filteredFeatures = Array.from(features).filter(function (it) {
        return it.checked;
      }).map(function (checked) {
        return checked.value;
      });
      removeMarkers();
      var adverts = window.data.adverts;
      var range = prices[housingPrice.value];
      var filteredAdverts = adverts.filter(function (advert) {
        return (housingType.value === 'any' || advert.offer.type === housingType.value) &&
        advert.offer.price >= range[0] && advert.offer.price < range[1] &&
        (housingRooms.value === 'any' || advert.offer.rooms === parseInt(housingRooms.value, 10)) &&
        (housingGuests.value === 'any' || advert.offer.guests === parseInt(housingGuests.value, 10)) &&
        testAdvertFeatures(filteredFeatures, advert.offer.features);
      }).slice(0, 5);
      window.data.filteredAdverts = filteredAdverts;
      mapMarkers.insertBefore(getMarkers(filteredAdverts), muffin);
    }
  };

  mapFilters.addEventListener('change', function () {
    window.pin.debounce(window.pin.refreshFilteredAdverts, 500);
  });

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
