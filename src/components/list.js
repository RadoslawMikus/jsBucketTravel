import { travelArr, travelMemory } from "./modal";

// ARRAY DECLARATION
// ------------------------------
let questions;
let eventsArr = [];
let personalArr = [];
let enterntainmentArr = [];
let othersArr = [];
export let fullArr = [];
let eventsMemory = JSON.parse(sessionStorage.getItem("eventsSessionArr"));
let otherMemory = JSON.parse(sessionStorage.getItem("otherSessionArr"));
let entMemory = JSON.parse(sessionStorage.getItem("entSessionArr"));
let personalMemory = JSON.parse(sessionStorage.getItem("personalSessionArr"));

window.addEventListener("click", () => {
  console.log("Ta zmienna jest czytana z pliku list: " + travelArr);
  console.log("Ta zmienna jest czytana z pamięci pliku list: " + travelMemory);
});

if (eventsMemory !== null) {
  eventsArr = eventsMemory;
}

if (otherMemory !== null) {
  othersArr = otherMemory;
}

if (entMemory !== null) {
  enterntainmentArr = entMemory;
}

if (personalMemory !== null) {
  personalArr = personalMemory;
}

fullArr = eventsArr.concat(personalArr, enterntainmentArr, othersArr).length;
document.querySelector("#numberList").innerHTML = fullArr;

const readQuestionsJson = async function () {
  const questionsJSON = require("../../assets/questions.json");
  const responseQuestions = await fetch(questionsJSON);
  const dataQuestions = await responseQuestions.json();
  questions = dataQuestions;

  // CREATING <LI> ELEMENTS WITH CHECKBOX AND QUESTION
  // ------------------------------

  const generateListItems = function (boxName, className, sectionName) {
    const listBox = document.querySelector(`.${boxName} ul`);

    for (let i = 0; i < Object.keys(questions[sectionName]).length; i++) {
      listBox.innerHTML += `<li><input class="${className}" type="checkbox" id="${i}"><span>
      ${questions[sectionName][i]}
      </span></li>`;
    }
  };

  generateListItems("wydarzeniaBox", "eventInput", "Wydarzenia");
  generateListItems("osobisteBox", "personalInput", "Osobiste");
  generateListItems("rozrywkaBox", "entertainmentInput", "Rozrywka");
  generateListItems("inneBox", "othersInput", "Inne");

  // ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
  // REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
  // ------------------------------

  const allPersonalInputs = document.querySelectorAll(".osobisteBox input");
  const allEventsInputs = document.querySelectorAll(".wydarzeniaBox input");
  const allEntertainmentInputs =
    document.querySelectorAll(".rozrywkaBox input");
  const allOtherInputs = document.querySelectorAll(".inneBox input");

  // CHECKED IF IN ARRAY
  // ------------------------------
  //NAMIERZYĆ WSZYSTKIE ID ZAWARTE W TABLICY
  //PRZECZYTAĆ WSZYSTKIE INPUTY I SPRAWDZIĆ, CZY ID INPUTA ZNAJDUJE SIĘ W TABLICY
  const checkedIfInArray = (inputName, arrName) => {
    inputName.forEach((input) => {
      if (arrName.includes(input.id)) {
        input.setAttribute("checked", "checked");
      }
    });
  };
  checkedIfInArray(allPersonalInputs, personalArr);
  checkedIfInArray(allEventsInputs, eventsArr);
  checkedIfInArray(allEntertainmentInputs, enterntainmentArr);
  checkedIfInArray(allOtherInputs, othersArr);

  // ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
  // REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
  // ------------------------------

  const addEvent = (inputName, arrName, sessionName) => {
    inputName.forEach((singleInput) =>
      singleInput.addEventListener("click", (e) => {
        if (e.target.getAttribute("checked")) {
          e.target.removeAttribute("checked");
          for (i = 0; i < arrName.length; i++) {
            if (arrName[i] === e.target.id) {
              arrName.splice(i, 1);
            }
          }
        } else {
          e.target.setAttribute("checked", "checked");
          arrName.push(e.target.id);
        }
        sessionStorage.setItem(sessionName, JSON.stringify(arrName));

        fullArr = eventsArr.concat(
          personalArr,
          enterntainmentArr,
          othersArr
        ).length;
        document.querySelector("#numberList").innerHTML = fullArr;
        console.log(
          `Osobiste: ${personalArr}, Rozrywka: ${enterntainmentArr}, Wydarzenia: ${eventsArr}, Inne: ${othersArr}, Wszystkie: ${fullArr}`
        );
      })
    );
  };

  addEvent(allPersonalInputs, personalArr, "personalSessionArr");
  addEvent(allEntertainmentInputs, enterntainmentArr, "entSessionArr");
  addEvent(allOtherInputs, othersArr, "otherSessionArr");
  addEvent(allEventsInputs, eventsArr, "eventsSessionArr");

  // SHOW QUESTIONS THAT ARE PRESENT IN EVERY ARRAY
  // ------------------------------

  document.querySelector(".quantity").addEventListener("click", () => {
    const showAllSelected = function (secName, arrName) {
      console.log(`${secName}:`);
      for (let i = 0; i < arrName.length; i++) {
        console.log(questions[secName][arrName[i]]);
      }
    };
    showAllSelected("Wydarzenia", eventsArr);
    showAllSelected("Rozrywka", enterntainmentArr);
    showAllSelected("Osobiste", personalArr);
    showAllSelected("Inne", othersArr);
  });
};

readQuestionsJson();
