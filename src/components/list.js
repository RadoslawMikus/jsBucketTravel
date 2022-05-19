import { kraje, travelArr } from "./modal";
import html2pdf from "jspdf-html2canvas";

// ARRAY DECLARATION
// ------------------------------
let questions;
export let eventsArr = [];
export let personalArr = [];
export let enterntainmentArr = [];
export let othersArr = [];
export let fullArr = {
  superArray: eventsArr.concat(
    personalArr,
    enterntainmentArr,
    othersArr,
    travelArr
  ).length,
};
let eventsMemory = JSON.parse(sessionStorage.getItem("eventsSessionArr"));
let otherMemory = JSON.parse(sessionStorage.getItem("otherSessionArr"));
let entMemory = JSON.parse(sessionStorage.getItem("entSessionArr"));
let personalMemory = JSON.parse(sessionStorage.getItem("personalSessionArr"));

window.addEventListener("click", () => {
  console.log(
    `Podróże: ${travelArr}, Osobiste: ${personalArr}, Rozrywka: ${enterntainmentArr}, Wydarzenia: ${eventsArr}, Inne: ${othersArr}, Wszystkie: ${fullArr.superArray}`
  );
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

fullArr.superArray = eventsArr.concat(
  personalArr,
  enterntainmentArr,
  othersArr,
  travelArr
).length;
document.querySelector("#numberList").innerHTML = fullArr.superArray;

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
          for (let i = 0; i < arrName.length; i++) {
            if (arrName[i] === e.target.id) {
              arrName.splice(i, 1);
            }
          }
        } else {
          e.target.setAttribute("checked", "checked");
          arrName.push(e.target.id);
        }
        fullArr.superArray = eventsArr.concat(
          personalArr,
          enterntainmentArr,
          othersArr,
          travelArr
        ).length;
        sessionStorage.setItem(sessionName, JSON.stringify(arrName));

        document.querySelector("#numberList").innerHTML = fullArr.superArray;
        // console.log(
        //   `Podróże: ${travelArr}, Osobiste: ${personalArr}, Rozrywka: ${enterntainmentArr}, Wydarzenia: ${eventsArr}, Inne: ${othersArr}, Wszystkie: ${fullArr.superArray}`
        // );
      })
    );
  };

  addEvent(allPersonalInputs, personalArr, "personalSessionArr");
  addEvent(allEntertainmentInputs, enterntainmentArr, "entSessionArr");
  addEvent(allOtherInputs, othersArr, "otherSessionArr");
  addEvent(allEventsInputs, eventsArr, "eventsSessionArr");

  // SHOW QUESTIONS THAT ARE PRESENT IN EVERY ARRAY
  // ------------------------------
  //
  const resultsBox = document.querySelector(".resultsBox");

  const usedHash = window.location.hash;
  window.location.hash = "";
  window.location.hash = usedHash;

  //STWORZYĆ H1
  const yourListHeader = document.createElement("h1");
  //DODAĆ TWOJA LISTA: DO INNER HTML
  yourListHeader.innerHTML = "TWOJA LISTA:";
  //DODAĆ H1
  //STWORZYĆ H2
  const travelHeader = document.createElement("h2");
  //DODAĆ PODROŻE: DO INNER HTML
  travelHeader.innerHTML = "Podróże:";
  //DODAĆ H2
  //STWORZYĆ UL
  const travelResults = document.createElement("ul");
  const generatePdfBtn = document.createElement("button");
  //DODAĆ UL

  window.addEventListener("hashchange", function () {
    if (location.hash === "#results") {
      resultsBox.innerHTML = "";
      travelResults.innerHTML = "";

      resultsBox.appendChild(yourListHeader);

      if (travelArr.length > 0) {
        resultsBox.appendChild(travelHeader);
        resultsBox.appendChild(travelResults);

        for (let i = 0; i < kraje.length; i++) {
          if (travelArr.includes(kraje[i].id)) {
            //STWORZYĆ LI
            const liTravel = document.createElement("li");
            //DODAĆ KRAJ DO LI

            liTravel.innerHTML =
              kraje[i].getAttribute("name") +
              `<button id="${kraje[i].id}" data-html2canvas-ignore="true" class="removeFromList">X</button>`;
            //DODAĆ LI DO UL
            travelResults.appendChild(liTravel);
          }
        }
      }

      const showAllSelected = function (secName, arrName) {
        //STWORZYĆ H1
        const sectionHeader = document.createElement("h1");
        //DODAĆ NAZWĘ TABLICY DO INNER HTML
        sectionHeader.innerHTML = secName;
        //DODAĆ H1
        resultsBox.appendChild(sectionHeader);
        //STWORZYĆ UL
        const sectionUl = document.createElement("ul");
        //DODAĆ UL
        resultsBox.appendChild(sectionUl);
        // console.log(`${secName}:`);
        for (let i = 0; i < arrName.length; i++) {
          //STWORZYĆ LI
          const sectionLi = document.createElement("li");
          //DODAĆ QUESTION DO LI INNER HTML
          sectionLi.innerHTML =
            questions[secName][arrName[i]] +
            `<button id="${arrName[i]}" data-html2canvas-ignore="true" class="removeFromList">X</button>`;
          //DODAĆ LI DO UL
          sectionUl.appendChild(sectionLi);
          sectionLi.addEventListener("click", (e) => {
            for (let i = 0; i < arrName.length; i++) {
              if (arrName[i] === e.target.id) {
                arrName.splice(i, 1);
              }
            }

            fullArr.superArray = eventsArr.concat(
              personalArr,
              enterntainmentArr,
              othersArr,
              travelArr
            ).length;
            document.querySelector("#numberList").innerHTML =
              fullArr.superArray;
          });
        }
      };
      if (eventsArr.length > 0) {
        showAllSelected("Wydarzenia", eventsArr);
      }

      if (enterntainmentArr.length > 0) {
        showAllSelected("Rozrywka", enterntainmentArr);
      }

      if (personalArr.length > 0) {
        showAllSelected("Osobiste", personalArr);
      }

      if (othersArr.length > 0) {
        showAllSelected("Inne", othersArr);
      }
    }

    generatePdfBtn.innerHTML = "Wygeneruj";
    generatePdfBtn.setAttribute("data-html2canvas-ignore", "true");
    resultsBox.appendChild(generatePdfBtn);

    // const removeFromList = document.querySelectorAll(".removeFromList");
    // removeFromList.forEach((remove) => {
    //   remove.addEventListener("click", (e) => {
    //     console.log(e.target);
    //   });
    // });
  });

  let opt = {
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { width: 800 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  generatePdfBtn.addEventListener("click", () => {
    html2pdf(resultsBox, opt);
  });
};

readQuestionsJson();
