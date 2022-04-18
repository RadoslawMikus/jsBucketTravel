const countriesJSON = require("../../assets/countries.json");

fetch("../../assets/countries.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => console.log(jsondata));

const countries = [
  "Andora",
  "Albania",
  "Austria",
  "Białoruś",
  "Belgia",
  "Bośnia i Hercegowina",
  "Bułgaria",
  "Chorwacja",
  "Cypr",
  "Czechy",
  "Niemcy",
  "Dania",
  "Estonia",
  "Hiszpania",
  "Finlandia",
  "Francja",
  "Wielka Brytania",
  "Grecja",
  "Węgry",
  "Chorwacja",
  "Islandia",
  "Irlandia",
  "Włochy",
  "Liechtenstein",
  "Litwa",
  "Luksemburg",
  "Łotwa",
  "Macedonia Północna",
  "Malta",
  "Mołdawia",
  "Monako",
  "Czarnogóra",
  "Holandia",
  "Norwegia",
  "Polska",
  "Portugalia",
  "Rumunia",
  "Rosja",
  "San Marino",
  "Serbia",
  "Szwecja",
  "Szwajcaria",
  "Słowenia",
  "Słowacja",
];

const reset = function () {
  arrCountriesSearch = [];
  suggestions.innerHTML = "";
};

const okienko = document.querySelector(".searchingBar");
const suggestions = document.querySelector(".suggestions");

let arrCountriesSearch = [];

okienko.addEventListener("input", function (event) {
  reset();
  countries.forEach(function (country) {
    if (country.toLowerCase().startsWith(event.target.value.toLowerCase())) {
      arrCountriesSearch.push(country);
      suggestions.style.padding = "3px 10px";
      okienko.style.borderRadius = "5px 5px 0 0";
    }
  });

  let arrSuggestions = arrCountriesSearch.forEach(function (item) {
    suggestions.innerHTML += `<a href="#">${item}</a> <hr class = "bar">`;
  });

  if (event.target.value == "" || arrCountriesSearch == "") {
    reset();
    okienko.style.borderRadius = "5px";
    suggestions.style.padding = "0 5px";
  }
});

window.addEventListener("click", function (event) {
  if (event.target !== okienko && event.target !== suggestions) {
    reset();
    okienko.style.borderRadius = "5px";
    suggestions.style.padding = "0 5px";
  }
});

window.addEventListener("keypress", function (event) {
  if (event.key == "Escape") {
    reset();
    okienko.style.borderRadius = "5px";
    suggestions.style.padding = "0 5px";
  }
});
