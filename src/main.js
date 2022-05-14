import "./main.scss";
import "bootstrap";
import "../assets/countries.json";
import "../assets/questions.json";
import navbar from "./navbarComponent.html";
import footer from "./footerComponent.html";

document.querySelector(".navbarComponent").innerHTML = navbar;
document.querySelector(".footerComponent").innerHTML = footer;

// window.addEventListener("click", (e) => {
//   if (e.target.innerHTML == "Podróże") {
//     document.querySelector(".travelComponent").classList.remove("d-none");
//     document.querySelector(".searchBox").classList.remove("d-none");
//     document.querySelector(".menuComponent").classList.add("d-none");
//   } else if (e.target.innerHTML == "Osobiste") {
//     document.querySelector(".osobisteComponent").classList.remove("d-none");
//     document.querySelector(".menuComponent").classList.add("d-none");
//   } else if (e.target.innerHTML == "Wydarzenia") {
//     document.querySelector(".wydarzeniaComponent").classList.remove("d-none");
//     document.querySelector(".menuComponent").classList.add("d-none");
//   } else if (e.target.innerHTML == "Rozrywka") {
//     document.querySelector(".rozrywkaComponent").classList.remove("d-none");
//     document.querySelector(".menuComponent").classList.add("d-none");
//   } else if (e.target.innerHTML == "Inne") {
//     document.querySelector(".inneComponent").classList.remove("d-none");
//     document.querySelector(".menuComponent").classList.add("d-none");
//   }
// else if(e.target == document.querySelector('.comeBack')){
//   document.querySelector(".travelComponent").classList.add("d-none");
//   document.querySelector(".osobisteComponent").classList.add("d-none");
//   document.querySelector(".wydarzeniaComponent").classList.add("d-none");
//   document.querySelector(".rozrywkaComponent").classList.add("d-none");
//   document.querySelector(".inneComponent").classList.add("d-none");
//   document.querySelector(".menuComponent").classList.remove("d-none");
// }
// });

const hideAllComponents = function () {
  document.querySelector(".travelComponent").classList.add("d-none");
  document.querySelector(".osobisteComponent").classList.add("d-none");
  document.querySelector(".wydarzeniaComponent").classList.add("d-none");
  document.querySelector(".rozrywkaComponent").classList.add("d-none");
  document.querySelector(".inneComponent").classList.add("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
  document.querySelector(".searchBox").classList.add("d-none");
};

const usedHash = window.location.hash;
window.location.hash = "";
window.location.hash = usedHash;

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
  } else if (location.hash === "") {
    hideAllComponents();
    document.querySelector(".menuComponent").classList.remove("d-none");
  }
});
