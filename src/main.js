import "./main.scss";
import "bootstrap";
import "../assets/countries.json";
import navbar from "./navbarComponent.html";
import footer from "./footerComponent.html";

document.querySelector(".navbarComponent").innerHTML = navbar;
document.querySelector(".footerComponent").innerHTML = footer;

window.addEventListener("click", (e) => {

  if(e.target.innerHTML == "Podróże"){
    document.querySelector(".travelComponent").classList.remove("d-none");
    document.querySelector(".searchBox").classList.remove("d-none");
    document.querySelector(".menuComponent").classList.add("d-none");
  }
else if(e.target.innerHTML == "Osobiste"){
  document.querySelector(".osobisteComponent").classList.remove("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
}
else if(e.target.innerHTML == "Wydarzenia"){
  document.querySelector(".wydarzeniaComponent").classList.remove("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
}
else if(e.target.innerHTML == "Rozrywka"){
  document.querySelector(".rozrywkaComponent").classList.remove("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
}
else if(e.target.innerHTML == "Inne"){
  document.querySelector(".inneComponent").classList.remove("d-none");
  document.querySelector(".menuComponent").classList.add("d-none");
}

});
