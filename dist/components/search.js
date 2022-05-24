/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4393:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "assets/countries..json";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// --------------------------------
// DECLARATIONS
// --------------------------------

const okienko = document.querySelector(".searchingBar");
const suggestions = document.querySelector(".suggestions");
const xClosing = document.querySelector(".searching span");
let arrCountriesSearch = [];

// --------------------------------
// RESET SUGGESTIONS
// --------------------------------

const reset = function () {
  arrCountriesSearch = [];
  suggestions.innerHTML = "";
  okienko.style.borderRadius = "5px";
};

// --------------------------------
// READ JSON WITH COUNTRIES
// --------------------------------

const readJson = async function () {
  const countriesJSON = __webpack_require__(4393);
  const response = await fetch(countriesJSON);
  const data = await response.json();
  const countries = data;

  // --------------------------------
  // LOAD COUNTRIES
  // --------------------------------

  const loadCountries = function (event) {
    reset();

    if (okienko.value != "") {
      xClosing.style.display = "block";
    } else {
      xClosing.style.display = "none";
    }
    for (let i = 0; i < countries.Countries.length; i++) {
      if (
        countries.Countries[i].name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      ) {
        arrCountriesSearch.push(countries.Countries[i].name);
        okienko.style.borderRadius = "5px 5px 0 0";
      }
    }

    // --------------------------------
    // GENERATE SUGGESTIONS
    // --------------------------------

    arrCountriesSearch.forEach(function (item) {
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#${item}"">${item}</a></li>`;
    });

    // --------------------------------
    // RESET IF EMPTY
    // --------------------------------

    if (event.target.value == "" || arrCountriesSearch == "") {
      reset();
    }
  };

  okienko.addEventListener("input", loadCountries);
};

// --------------------------------
// RUN FUNCTION READJSON
// --------------------------------

readJson();

// --------------------------------
// CLICK AND ESCAPE TO CLOSE
// --------------------------------

const clickToClose = function (event) {
  if (event.target.classList.contains("singleSuggestion")) {
    okienko.value = event.target.innerHTML;
    reset();
  } else if (event.target !== okienko) {
    reset();
  }

  if (okienko.value != "") {
    xClosing.style.display = "block";
  } else {
    xClosing.style.display = "none";
  }
};

const escapeToClose = function (event) {
  if (event.key == "Escape") {
    reset();
  }
};

// --------------------------------
// CLICK X AND ENTER TO RESET INPUT
// --------------------------------

const xToResetInput = function () {
  okienko.value = "";
  xClosing.style.display = "none";
};

const enterToResetInput = function (event) {
  if (event.key == "Enter") {
    okienko.value = "";
    xClosing.style.display = "none";
    reset();
  }
};

// --------------------------------
// POPULAR SUGGESTIONS
// --------------------------------

const focusPopular = function (event) {
  if (event.target.value == "" && arrCountriesSearch == "") {
    arrCountriesSearch = [
      "Francja",
      "Włochy",
      "Niemcy",
      "Portugalia",
      "Hiszpania",
    ];
    arrCountriesSearch.forEach(function (item) {
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#${item}">${item}</a></li><hr class = "bar">`;
    });
    okienko.style.borderRadius = "5px 5px 0 0";
  }
};

// --------------------------------
// ADD EVENT LISTENERS
// --------------------------------
window.addEventListener("click", clickToClose);
window.addEventListener("keypress", escapeToClose);
window.addEventListener("focus", focusPopular, true);
xClosing.addEventListener("click", xToResetInput);
xClosing.addEventListener("keypress", enterToResetInput);

})();

/******/ })()
;