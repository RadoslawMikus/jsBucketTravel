// --------------------------------
// DECLARATIONS
// --------------------------------
import { countriesJS } from "../main.js";
const searchBar = document.querySelector(".searchingBar");
const suggestions = document.querySelector(".suggestions");
const xClosing = document.querySelector(".searching span");
let arrCountriesSearch = [];

// --------------------------------
// RESET SUGGESTIONS
// --------------------------------
const reset = function () {
  arrCountriesSearch = [];
  suggestions.innerHTML = "";
  searchBar.style.borderRadius = "5px";
};

// --------------------------------
// LOAD COUNTRIES
// --------------------------------
const loadCountries = function (e) {
  reset();

  if (searchBar.value != "") {
    xClosing.style.display = "block";
  } else {
    xClosing.style.display = "none";
  }
  for (let i = 0; i < countriesJS.Countries.length; i++) {
    if (
      countriesJS.Countries[i].name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase())
    ) {
      arrCountriesSearch.push(countriesJS.Countries[i].name);
      searchBar.style.borderRadius = "5px 5px 0 0";
    }
  }

  searchBar.addEventListener("input", loadCountries);

  // --------------------------------
  // GENERATE SUGGESTIONS
  // --------------------------------
  arrCountriesSearch.forEach(function (item) {
    suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#podroze"">${item}</a></li><hr class = "bar">`;
  });

  // --------------------------------
  // RESET IF EMPTY
  // --------------------------------
  e.target.value == "" || arrCountriesSearch == "" ? reset() : "";
};

// --------------------------------
// CLICK AND ESCAPE TO CLOSE
// --------------------------------
const clickToClose = function (e) {
  if (e.target.classList.contains("singleSuggestion")) {
    searchBar.value = e.target.innerHTML;
    reset();
  } else if (e.target !== searchBar) {
    reset();
  }

  if (searchBar.value != "") {
    xClosing.style.display = "block";
  } else {
    xClosing.style.display = "none";
  }
};

const escapeToClose = (e) => (e.key === "Escape" ? reset() : "");

// --------------------------------
// CLICK X AND ENTER TO RESET INPUT
// --------------------------------
const xToResetInput = () => {
  searchBar.value = "";
  xClosing.style.display = "none";
};

const enterToResetInput = (e) => {
  if (e.key == "Enter") {
    searchBar.value = "";
    xClosing.style.display = "none";
    reset();
  }
};

// --------------------------------
// POPULAR SUGGESTIONS
// --------------------------------
const focusPopular = function (e) {
  if (e.target.value == "" && arrCountriesSearch == "") {
    arrCountriesSearch = [
      "Francja",
      "Włochy",
      "Niemcy",
      "Portugalia",
      "Hiszpania",
    ];
    arrCountriesSearch.forEach(function (item) {
      suggestions.innerHTML += `<li><a class= "singleSuggestion" href = "#podroze">${item}</a></li><hr class = "bar">`;
    });
    searchBar.style.borderRadius = "5px 5px 0 0";
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
