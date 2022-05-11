// LIST OF travelQuestions
// ------------------------------

const travelQuestions = {
  0: {
    id: 0,
    content: "Czy lubisz kebsa?",
    status: "checked",
  },

  1: {
    id: 1,
    content: "A w Krakowie, na brackiej pada pinionc",
    status: "unchecked",
  },

  2: {
    id: 2,
    content: "Paszoł, bo psem poszczuję",
    status: "unchecked",
  },

  3: {
    id: 3,
    content: "Bo bo bo bo, bi bi bi bi",
    status: "checked",
  },

  4: {
    id: 4,
    content: "Po co Ci kapusta?",
    status: "unchecked",
  },

  5: {
    id: 5,
    content: "Element piąty",
    status: "unchecked",
  },
};

// ARRAY DECLARATION
// ------------------------------
let travelListArr = [];

// CREATING <LI> ELEMENTS WITH CHECKBOX AND QUESTION
// ------------------------------
const wholeList = document.querySelector(".osobisteBox ul");

for (let i = 0; i < Object.keys(travelQuestions).length; i++) {
  wholeList.innerHTML += `<li><input type="checkbox" id="${travelQuestions[i].id}"><span>${travelQuestions[i].content}</span></li>`;
}

// ON CLICK: ADD TO ARRAY AND ADD PROPERTY CHECKED/
// REMOVE FROM ARRAY AND REMOVE PROPERTY CHECKED
// ------------------------------

const allImputs = document.querySelectorAll(".osobisteBox ul li input");

const isChecked = function (e) {
  if (e.target.getAttribute("checked")) {
    for (i = 0; i < travelListArr.length; i++) {
      if (travelListArr[i] === e.target.id) {
        travelListArr.splice(i, 1);
      }
    }
    allImputs[e.target.id].removeAttribute("checked");
  } else {
    travelListArr.push(e.target.id);
    allImputs[e.target.id].setAttribute("checked", "checked");
  }

  document.querySelector(".quantity").innerHTML =
    "Liczba pozycji na liście: " + travelListArr.length;
};

allImputs.forEach(function (singleImput) {
  singleImput.addEventListener("click", isChecked);

  // SET ATTRIBUTE CHECKED IF ID IS IN THE ARRAY
  // ------------------------------

  if (travelListArr.includes(singleImput.id)) {
    singleImput.setAttribute("checked", "checked");
  } else {
  }
});

// SHOW travelQuestions THAT ARE PRESENT IN THE ARRAY
// ------------------------------

document.querySelector(".quantity").addEventListener("click", () => {
  console.log("Travel: ");
  for (let i = 0; i < Object.keys(travelQuestions).length; i++) {
    if (travelListArr.includes(travelQuestions[i].id.toString())) {
      console.log(travelQuestions[i].content);
    }
  }
});
