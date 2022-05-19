import { isPressed } from "./zoom";
import {
  eventsArr,
  othersArr,
  enterntainmentArr,
  personalArr,
  fullArr,
} from "./list";
export const kraje = document.querySelectorAll(".travelBox svg path");
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

const readJson = async function () {
  const countriesJSON = require("../../assets/countries.json");
  const response = await fetch(countriesJSON);
  const data = await response.json();
  const countries = data;

  let travelSelectBtn;
  const travelSelect = document.createElement("div");

  const closingBtn = document.createElement("button");
  closingBtn.classList.add("closingBtn");
  closingBtn.innerHTML = "X";

  const openIt = function (kraj) {
    modalMap.style.display = "block";
    modalBackground.style.display = "flex";

    for (let i = 0; i < countries.Countries.length; i++) {
      if (kraj.getAttribute("name") === countries.Countries[i].name) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            countries.Countries[i].capital +
            "&&appid=aa1390a55af9f6c7ae1a6fa751cd483d&lang=PL&units=metric"
        )
          .then((response) => response.json())
          .then((data) => {
            modalMap.innerHTML = `<h2>${countries.Countries[i].name}</h2>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].capital}</h4>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].currency.name}</h4>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].info1}</h4>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].info2}</h4>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].language.name}</h4>`;
            modalMap.innerHTML += `<h4>${countries.Countries[i].population}</h4>`;
            modalMap.innerHTML += `<img style="height: 50px; width: 80px;" src="${countries.Countries[i].flag}" alt="">`;
            modalMap.innerHTML += `<img style="height: 100px" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="x">`;
            modalMap.innerHTML += `<img style="height: 100px" src="${countries.Countries[i].emblem}" alt="x">`;
            modalMap.innerHTML += data.main.temp;
            modalMap.appendChild(closingBtn);
            modalMap.appendChild(travelSelect);
          });

        travelSelect.classList.add("travelSelectBtn");
      }
    }

    window.addEventListener("click", function (e) {
      if (e.target == modalBackground) {
        closeModal();
      }
    });

    closingBtn.addEventListener("click", closeModal);

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

  const closeModal = () => {
    modalBackground.style.display = "none";
    travelSelect.innerHTML = "";
  };
};
readJson();

// window.addEventListener("click", () => {
//   console.log(
//     `Podróże: ${travelArr}, Osobiste: ${personalArr}, Rozrywka: ${enterntainmentArr}, Wydarzenia: ${eventsArr}, Inne: ${othersArr}, Wszystkie: ${fullArr.superArray}`
//   );
// });

//STWORZYĆ SPAN z X w środku DONE
//NADAĆ MU KLASĘ closingBtn DONE
// WYŚWIETLIĆ GO WEWNĄTRZ MODALU DONE
//DODAĆ DO NIEGO ADDEVENT, KTORY BĘDZIE ROBIŁ DISPLAY NONE DLA MODALU i TŁA DONE
//DODAĆ ADD EVENT CLICK, ESCAPE I CLICK OUTSIDE OF MODAL DONE

//STWORZYĆ DIVA Z INPUTEM W ŚRODKU
//NADAĆ DIVOVI KLASĘ travelSelectBtn
//USTAWIĆ, ŻE PO KLIKNIĘCIU INPUTU JEST ON USTAWIONY NA CHECKED/UNCHECKED I JEST DODAWANY/USUWANY Z TABLICY travelArr
//PO KAŻDYM DODANIU AKTUALIZOWAĆ OSTATECZNA LISTĘ

// ------------------------
// INNE RZECZY
// ------------------------
