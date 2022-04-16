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
      suggestions.style.padding = "3px 5px";
      okienko.style.borderRadius = "5px 5px 0 0";
    }
  });

  let arrSuggestions = arrCountriesSearch.forEach(function (item) {
    suggestions.innerHTML += item + " <br />";
  });

  if (event.target.value == "") {
    reset();
    okienko.style.borderRadius = "5px";
    suggestions.style.padding = "0 5px";
  }
});
