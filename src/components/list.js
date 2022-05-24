// --------------------------------
// IMPORTS
// --------------------------------
import { kraje, travelArr } from "./modal";
import html2pdf from "jspdf-html2canvas";

// --------------------------------
// DECLARATIONS
// --------------------------------
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

// --------------------------------
// SESSIONSTORAGE LOGICS
// --------------------------------
let eventsMemory = JSON.parse(sessionStorage.getItem("eventsSessionArr"));
let otherMemory = JSON.parse(sessionStorage.getItem("otherSessionArr"));
let entMemory = JSON.parse(sessionStorage.getItem("entSessionArr"));
let personalMemory = JSON.parse(sessionStorage.getItem("personalSessionArr"));

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

// --------------------------------
// LOADING JSON WITH QUESTIONS
// --------------------------------
const readQuestionsJson = async function () {
  const questionsJSON = require("../../assets/questions.json");
  const responseQuestions = await fetch(questionsJSON);
  const dataQuestions = await responseQuestions.json();
  questions = dataQuestions;

  // --------------------------------
  // GENERATING QUESTION LIST
  // --------------------------------
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

  // --------------------------------
  // ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
  // REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
  // --------------------------------
  const allPersonalInputs = document.querySelectorAll(".osobisteBox input");
  const allEventsInputs = document.querySelectorAll(".wydarzeniaBox input");
  const allEntertainmentInputs =
    document.querySelectorAll(".rozrywkaBox input");
  const allOtherInputs = document.querySelectorAll(".inneBox input");

  // --------------------------------
  // CHECK IF IT IS IN ARRAY
  // --------------------------------
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

  // --------------------------------
  // ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
  // REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
  // --------------------------------
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
      })
    );
  };

  addEvent(allPersonalInputs, personalArr, "personalSessionArr");
  addEvent(allEntertainmentInputs, enterntainmentArr, "entSessionArr");
  addEvent(allOtherInputs, othersArr, "otherSessionArr");
  addEvent(allEventsInputs, eventsArr, "eventsSessionArr");

  // --------------------------------
  // SHOW QUESTIONS THAT ARE PRESENT IN  ARRAY
  // --------------------------------
  const resultsBox = document.querySelector(".resultsBox");

  const usedHash = window.location.hash;
  window.location.hash = "";
  window.location.hash = usedHash;

  const yourListHeader = document.createElement("h1");
  yourListHeader.innerHTML = "TWOJA LISTA:";

  const listIsEmpty = document.createElement("div");
  listIsEmpty.classList.add("listIsEmpty");
  listIsEmpty.innerHTML = "Twoja lista jest jeszcze pusta.";
  const travelHeader = document.createElement("h2");
  const travelResults = document.createElement("ul");
  const generatePdfBtn = document.createElement("button");

  // --------------------------------
  // SHOW RESULTS - TRAVEL
  // --------------------------------
  window.addEventListener("hashchange", function () {
    if (location.hash === "#results") {
      resultsBox.innerHTML = "";
      travelResults.innerHTML = "";
      travelHeader.innerHTML = `Podróże (${travelArr.length})`;

      resultsBox.appendChild(yourListHeader);

      if (
        eventsArr.concat(personalArr, enterntainmentArr, othersArr, travelArr)
          .length === 0
      ) {
        resultsBox.appendChild(listIsEmpty);
      }

      if (travelArr.length > 0) {
        resultsBox.appendChild(travelHeader);
        resultsBox.appendChild(travelResults);

        for (let i = 0; i < kraje.length; i++) {
          if (travelArr.includes(kraje[i].id)) {
            const liTravel = document.createElement("li");

            liTravel.addEventListener("click", (e) => {
              for (let i = 0; i < travelArr.length; i++) {
                if (travelArr[i] === e.target.id) {
                  travelArr.splice(i, 1);
                  liTravel.remove();
                  travelHeader.innerHTML = `Podróże (${travelArr.length})`;
                }
              }

              if (
                eventsArr.concat(
                  personalArr,
                  enterntainmentArr,
                  othersArr,
                  travelArr
                ).length === 0
              ) {
                listIsEmpty.remove();
              }

              fullArr.superArray = eventsArr.concat(
                personalArr,
                enterntainmentArr,
                othersArr,
                travelArr
              ).length;
              document.querySelector("#numberList").innerHTML =
                fullArr.superArray;
              sessionStorage.setItem(
                "travelSessionArr",
                JSON.stringify(travelArr)
              );

              if (travelArr.length === 0) {
                travelHeader.remove();
              }

              if (
                eventsArr.concat(
                  personalArr,
                  enterntainmentArr,
                  othersArr,
                  travelArr
                ).length === 0
              ) {
                generatePdfBtn.remove();
                travelHeader.remove();
                resultsBox.appendChild(listIsEmpty);
              }
            });

            liTravel.innerHTML =
              kraje[i].getAttribute("name") +
              `<button id="${kraje[i].id}" data-html2canvas-ignore="true" class="removeFromList">X</button>`;
            travelResults.appendChild(liTravel);
          }
        }
      }

      // --------------------------------
      // SHOW RESULTS - REST OF CATEGORIES
      // --------------------------------
      const showAllSelected = function (
        secName,
        arrName,
        sessionArr,
        allImputs
      ) {
        const sectionHeader = document.createElement("h2");
        sectionHeader.innerHTML = secName + ` (${arrName.length})`;
        resultsBox.appendChild(sectionHeader);
        const sectionUl = document.createElement("ul");
        resultsBox.appendChild(sectionUl);
        for (let i = 0; i < arrName.length; i++) {
          const sectionLi = document.createElement("li");
          sectionLi.innerHTML =
            questions[secName][arrName[i]] +
            `<button id="${arrName[i]}" data-html2canvas-ignore="true" class="removeFromList">X</button>`;
          sectionUl.appendChild(sectionLi);

          sectionLi.addEventListener("click", (e) => {
            for (let i = 0; i < arrName.length; i++) {
              if (arrName[i] === e.target.id) {
                arrName.splice(i, 1);
                sectionLi.remove();
                allImputs[e.target.id].checked = false;
                sectionHeader.innerHTML = secName + ` (${arrName.length})`;
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
            sessionStorage.setItem(sessionArr, JSON.stringify(arrName));
            if (arrName.length === 0) {
              sectionHeader.remove();
            }
            if (
              eventsArr.concat(
                personalArr,
                enterntainmentArr,
                othersArr,
                travelArr
              ).length === 0
            ) {
              generatePdfBtn.remove();
              resultsBox.appendChild(listIsEmpty);
            }
          });
        }
      };
      if (eventsArr.length > 0) {
        showAllSelected(
          "Wydarzenia",
          eventsArr,
          "eventsSessionArr",
          allEventsInputs
        );
      }

      if (personalArr.length > 0) {
        showAllSelected(
          "Osobiste",
          personalArr,
          "personalSessionArr",
          allPersonalInputs
        );
      }

      if (enterntainmentArr.length > 0) {
        showAllSelected(
          "Rozrywka",
          enterntainmentArr,
          "entSessionArr",
          allEntertainmentInputs
        );
      }

      if (othersArr.length > 0) {
        showAllSelected("Inne", othersArr, "otherSessionArr", allOtherInputs);
      }
    }

    generatePdfBtn.innerHTML = "Wygeneruj PDF";
    generatePdfBtn.setAttribute("data-html2canvas-ignore", "true");

    if (
      eventsArr.concat(personalArr, enterntainmentArr, othersArr, travelArr)
        .length > 0
    ) {
      resultsBox.appendChild(generatePdfBtn);
    }
  });

  // --------------------------------
  // EXPORT THE PDF
  // --------------------------------
  let opt = {
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },

    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  generatePdfBtn.addEventListener("click", () => {
    html2pdf(resultsBox, opt);
  });
};

readQuestionsJson();
