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
  const toHide = document.querySelectorAll(
    ".travelComponent, .personalComponent, .eventsComponent, .funComponent, .othersComponent, .menuComponent, .searchBox, .resultsComponent, #errorPage"
  );

  toHide.forEach((el) => el.classList.add("d-none"));
  document.querySelector(".comeBack").classList.remove("d-none");
};

const usedHash = window.location.hash;
window.location.hash = "";
window.location.hash = usedHash;

// --------------------------------
// CHANGE CONTENT ON HASH CHANGE
// --------------------------------
window.addEventListener("hashchange", function () {
  hideAllComponents();
  if (location.hash === "#podroze") {
    document
      .querySelectorAll(".travelComponent, .searchBox")
      .forEach((el) => el.classList.remove("d-none"));
  } else if (location.hash === "#osobiste") {
    document.querySelector(".personalComponent").classList.remove("d-none");
  } else if (location.hash === "#wydarzenia") {
    document.querySelector(".eventsComponent").classList.remove("d-none");
  } else if (location.hash === "#rozrywka") {
    document.querySelector(".funComponent").classList.remove("d-none");
  } else if (location.hash === "#inne") {
    document.querySelector(".othersComponent").classList.remove("d-none");
  } else if (location.hash === "#results") {
    document.querySelector(".resultsComponent").classList.remove("d-none");
  } else if (location.hash === "") {
    document.querySelector(".menuComponent").classList.remove("d-none");
    document.querySelector(".comeBack").classList.add("d-none");
  } else {
    document.querySelector("#errorPage").classList.remove("d-none");
    document.querySelector(".comeBack").classList.add("d-none");
  }
});
