import { isPressed } from "./zoom";
const kraje = document.querySelectorAll(".travelBox svg path");
const modalBackground = document.createElement("div");
const modalMap = document.createElement("div");
modalMap.classList.add("modalMap");
modalBackground.appendChild(modalMap);
document.body.appendChild(modalBackground);
modalBackground.classList.add("modalBackground");

const openModal = function (kraj) {
  if (isPressed == false) {
    kraj.addEventListener("click", function () {
      modalMap.style.display = "flex";
      modalBackground.style.display = "flex";
      modalMap.innerHTML = `<h2>${kraj.getAttribute("name")}</h2>`;
      console.log(kraj.getAttribute("id") + " " + kraj.getAttribute("name"));
    });
  }
};

kraje.forEach(openModal);
