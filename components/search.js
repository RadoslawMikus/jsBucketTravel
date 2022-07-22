// --------------------------------
// DECLARATIONS
// --------------------------------
import { countriesJS } from "../main.js";

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
  const countriesJSON = countriesJS;
  // const response = await fetch(countriesJSON);
  // const data = await response.json();
  // const countries = data;
  const countries = countriesJS;

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
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#${item}"">${item}</a></li><hr class = "bar">`;
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
