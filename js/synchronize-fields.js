'use strict';

(function () {
  window.synchronizeFields = function (firstElem, secondElem, firstValues, secondValues, callback) {
    for (var i = 0; i < firstValues.length; i++) {
      if (firstValues[i] === firstElem.value) {
        callback(secondElem, secondValues[i]);
      }
    }
  };
})();
