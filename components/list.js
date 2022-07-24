// --------------------------------
// DECLARATIONS
// --------------------------------
import { travelArr } from "./modal.js";
// let questions;
export let eventsArr = [];
export let personalArr = [];
export let enterntainmentArr = [];
export let othersArr = [];
import { questionsJS } from "../main.js";
import { countriesPaths } from "./modal.js";

// --------------------------------
// SESSION STORAGE LOGICS
// --------------------------------
let eventsMemory = JSON.parse(sessionStorage.getItem("eventsSessionArr"));
let otherMemory = JSON.parse(sessionStorage.getItem("otherSessionArr"));
let entMemory = JSON.parse(sessionStorage.getItem("entSessionArr"));
let personalMemory = JSON.parse(sessionStorage.getItem("personalSessionArr"));

eventsMemory !== null ? (eventsArr = eventsMemory) : "";
otherMemory !== null ? (othersArr = otherMemory) : "";
entMemory !== null ? (enterntainmentArr = entMemory) : "";
personalMemory !== null ? (personalArr = personalMemory) : "";

export let fullArr = {
  superArray: eventsArr.concat(
    personalArr,
    enterntainmentArr,
    othersArr,
    travelArr
  ).length,
};
document.querySelector("#numberList").innerHTML = fullArr.superArray;

// --------------------------------
// GENERATING QUESTION LIST
// --------------------------------
const generateListItems = function (boxName, className, sectionName) {
  const listBox = document.querySelector(`.${boxName} ul`);

  for (let i = 0; i < Object.keys(questionsJS[sectionName]).length; i++) {
    listBox.innerHTML += `<li><input class="${className}" type="checkbox" id="${i}"><span>
      ${questionsJS[sectionName][i]}
      </span></li>`;
  }
};

generateListItems("eventsBox", "eventInput", "Wydarzenia");
generateListItems("personalBox", "personalInput", "Osobiste");
generateListItems("funBox", "entertainmentInput", "Rozrywka");
generateListItems("othersBox", "othersInput", "Inne");

// --------------------------------
// ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
// REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
// --------------------------------
const allPersonalInputs = document.querySelectorAll(".personalBox input");
const allEventsInputs = document.querySelectorAll(".eventsBox input");
const allEntertainmentInputs = document.querySelectorAll(".funBox input");
const allOtherInputs = document.querySelectorAll(".othersBox input");

// CHECK IF IT IS IN ARRAY
const checkedIfInArray = (inputName, arrName) => {
  inputName.forEach((input) =>
    arrName.includes(input.id) ? (input.checked = true) : ""
  );
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
      if (e.target.checked === false) {
        e.target.checked = false;
        for (let i = 0; i < arrName.length; i++) {
          if (arrName[i] === e.target.id) {
            arrName.splice(i, 1);
          }
        }
      } else {
        e.target.checked = true;
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
    [resultsBox, travelResults].forEach((el) => (el.innerHTML = ""));
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

      for (let i = 0; i < countriesPaths.length; i++) {
        if (travelArr.includes(countriesPaths[i].id)) {
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

            travelArr.length === 0 ? travelHeader.remove() : "";

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
            countriesPaths[i].getAttribute("name") +
            `<button id="${countriesPaths[i].id}" data-html2canvas-ignore="true" class="removeFromList">X</button>`;
          travelResults.appendChild(liTravel);
        }
      }
    }

    // --------------------------------
    // SHOW RESULTS - REST OF CATEGORIES
    // --------------------------------
    const showAllSelected = function (secName, arrName, sessionArr, allImputs) {
      const sectionHeader = document.createElement("h2");
      sectionHeader.innerHTML = secName + ` (${arrName.length})`;
      resultsBox.appendChild(sectionHeader);
      const sectionUl = document.createElement("ul");
      resultsBox.appendChild(sectionUl);
      for (let i = 0; i < arrName.length; i++) {
        const sectionLi = document.createElement("li");
        sectionLi.innerHTML =
          questionsJS[secName][arrName[i]] +
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
          document.querySelector("#numberList").innerHTML = fullArr.superArray;
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
  jsPDF: {
    format: "a4",
  },
  imageType: "image/jpeg",
  output: "./pdf/generate.pdf",
};

generatePdfBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
  html2PDF(resultsBox, opt);
});
