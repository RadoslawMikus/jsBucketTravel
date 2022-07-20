// --------------------------------
// IMPORTS
// --------------------------------

import { countriesJ } from "./assets/countries.js";
import { questionsJ } from "./assets/questions.js";
export const countriesJS = countriesJ;
export const questionsJS = questionsJ;

// --------------------------------
// HIDE ALL COMPONENTS
// --------------------------------

const hideAllComponents = function () {
  document.querySelector(".travelComponent").classList.add("d-none");
  document.querySelector(".osobisteComponent").classList.add("d-none");
  document.querySelector(".wydarzeniaComponent").classList.add("d-none");
  document.querySelector(".rozrywkaComponent").classList.add("d-none");
  document.querySelector(".inneComponent").classList.add("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
  document.querySelector(".searchBox").classList.add("d-none");
  document.querySelector(".resultsComponent").classList.add("d-none");
  document.querySelector(".comeBack").classList.remove("d-none");
};

document.querySelector(".comeBack").classList.add("d-none");

const usedHash = window.location.hash;
window.location.hash = "";
window.location.hash = usedHash;

// --------------------------------
// CHANGE CONTENT ON HASH CHANGE
// --------------------------------

window.addEventListener("hashchange", function () {
  if (location.hash === "#podroze") {
    hideAllComponents();
    document.querySelector(".travelComponent").classList.remove("d-none");
    document.querySelector(".searchBox").classList.remove("d-none");
  } else if (location.hash === "#osobiste") {
    hideAllComponents();
    document.querySelector(".osobisteComponent").classList.remove("d-none");
  } else if (location.hash === "#wydarzenia") {
    hideAllComponents();
    document.querySelector(".wydarzeniaComponent").classList.remove("d-none");
  } else if (location.hash === "#rozrywka") {
    hideAllComponents();
    document.querySelector(".rozrywkaComponent").classList.remove("d-none");
  } else if (location.hash === "#inne") {
    hideAllComponents();
    document.querySelector(".inneComponent").classList.remove("d-none");
  } else if (location.hash === "#results") {
    hideAllComponents();
    document.querySelector(".resultsComponent").classList.remove("d-none");
  } else if (location.hash === "") {
    hideAllComponents();
    document.querySelector(".menuComponent").classList.remove("d-none");
    document.querySelector(".comeBack").classList.add("d-none");
  }
});

// -------------------------------------------
// SEARCH
// -------------------------------------------

// -------------------------------------------
// ZOOM
// -------------------------------------------

// -------------------------------------------
// MODAL
// -------------------------------------------

// -------------------------------------------
// LIST
// -------------------------------------------
