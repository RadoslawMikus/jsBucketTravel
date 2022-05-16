import { isPressed } from "./zoom";
import {
  eventsArr,
  othersArr,
  enterntainmentArr,
  personalArr,
  fullArr,
} from "./list";
const kraje = document.querySelectorAll(".travelBox svg path");
const modalBackground = document.createElement("div");
const modalMap = document.createElement("div");
modalMap.classList.add("modalMap");
modalBackground.appendChild(modalMap);
document.body.appendChild(modalBackground);
modalBackground.classList.add("modalBackground");
export let travelArr = [];
export let travelMemory = JSON.parse(
  sessionStorage.getItem("travelSessionArr")
);

if (travelMemory !== null) {
  travelArr = travelMemory;
}

window.addEventListener("click", () => {
  console.log(
    `Podróże: ${travelArr}, Osobiste: ${personalArr}, Rozrywka: ${enterntainmentArr}, Wydarzenia: ${eventsArr}, Inne: ${othersArr}, Wszystkie: ${fullArr.superArray}`
  );
});

//STWORZYĆ SPAN z X w środku DONE
//NADAĆ MU KLASĘ closingBtn DONE
// WYŚWIETLIĆ GO WEWNĄTRZ MODALU DONE
//DODAĆ DO NIEGO ADDEVENT, KTORY BĘDZIE ROBIŁ DISPLAY NONE DLA MODALU i TŁA DONE
//DODAĆ ADD EVENT CLICK, ESCAPE I CLICK OUTSIDE OF MODAL DONE

const closingBtn = document.createElement("button");
closingBtn.classList.add("closingBtn");
closingBtn.innerHTML = "X";
modalMap.appendChild(closingBtn);

const closeModal = () => {
  modalBackground.style.display = "none";
  travelSelect.innerHTML = "";
};

//STWORZYĆ DIVA Z INPUTEM W ŚRODKU
//NADAĆ DIVOVI KLASĘ travelSelectBtn
//USTAWIĆ, ŻE PO KLIKNIĘCIU INPUTU JEST ON USTAWIONY NA CHECKED/UNCHECKED I JEST DODAWANY/USUWANY Z TABLICY travelArr
//PO KAŻDYM DODANIU AKTUALIZOWAĆ OSTATECZNA LISTĘ

const travelSelect = document.createElement("div");
travelSelect.classList.add("travelSelectBtn");
modalMap.appendChild(travelSelect);
let travelSelectBtn;

// ------------------------
// INNE RZECZY
// ------------------------

const openIt = function (kraj) {
  modalMap.style.display = "flex";
  modalBackground.style.display = "flex";
  // modalMap.innerHTML += `<h2>${kraj.getAttribute("name")}</h2>`;
  closingBtn.addEventListener("click", closeModal);
  window.addEventListener("click", function (e) {
    if (e.target == modalBackground) {
      closeModal();
    }
  });

  document.body.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });

  travelSelectBtn = document.createElement("input");
  travelSelectBtn.setAttribute("type", "checkbox");
  travelSelect.appendChild(travelSelectBtn);

  if (travelArr.includes(kraj.getAttribute("id"))) {
    travelSelectBtn.setAttribute("checked", "checked");
  } else {
    travelSelectBtn.removeAttribute("checked");
  }

  travelSelectBtn.addEventListener("click", () => {
    if (travelSelectBtn.getAttribute("checked") === "checked") {
      travelSelectBtn.removeAttribute("checked");
      for (let i = 0; i < travelArr.length; i++) {
        if (travelArr[i] === kraj.getAttribute("id")) {
          travelArr.splice(i, 1);
        }
      }
    } else {
      travelSelectBtn.setAttribute("checked", "checked");
      travelArr.push(kraj.getAttribute("id"));
    }
    fullArr.superArray = eventsArr.concat(
      personalArr,
      enterntainmentArr,
      othersArr,
      travelArr
    ).length;
    document.querySelector("#numberList").innerHTML = fullArr.superArray;
    sessionStorage.setItem("travelSessionArr", JSON.stringify(travelArr));
  });
};

const openModal = function (kraj) {
  if (isPressed == false) {
    kraj.addEventListener("click", () => {
      openIt(kraj);
    });
  }
};

kraje.forEach(openModal);

window.addEventListener("click", (e) => {
  kraje.forEach((kraj) => {
    if (e.target.classList.contains("singleSuggestion")) {
      if (e.target.innerHTML == kraj.getAttribute("name")) {
        openIt(kraj);
      }
    }
  });
});
