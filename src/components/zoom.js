const zoomPlus = document.querySelector("#zoomPlus");
const zoomMinus = document.querySelector("#zoomMinus");
const europeMap = document.querySelector(".mapBox svg");
const mapBox = document.querySelector(".mapBox");

let currentScale = 1;

const zoomIn = function () {
  if (currentScale < 3) {
    currentScale *= 1.3;
    europeMap.style.transform = `scale(${currentScale})`;
  }
};

const zoomOut = function () {
  if (currentScale >= 1.3) {
    currentScale /= 1.3;
    europeMap.style.transform = `scale(${currentScale})`;
  }
};

zoomPlus.addEventListener("click", zoomIn);
zoomMinus.addEventListener("click", zoomOut);

// Funkcja po naciśnięciu i trzymaniu lewego przycisku myszy
// Zapisz moją pozycję X i Y względem okna
// Jak przesuwam myszkę trzymając, pamiętaj moją pozycję
// Odejmuj X i Y początkowe od aktualnego

let xBeg = 0;
let yBeg = 0;
let xAft = 0;
let yAft = 0;
let isPressed;

const dragDown = function (e) {
  xBeg = e.clientX;
  yBeg = e.clientY;

  isPressed = true;

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", dragQuit);
};

const dragMove = function (e) {
  if (isPressed == true) {
    xAft = xBeg - e.clientX;
    yAft = yBeg - e.clientY;
    xBeg = e.clientX;
    yBeg = e.clientY;
    mapBox.style.top = mapBox.offsetTop - yAft + "px";
    mapBox.style.left = mapBox.offsetLeft - xAft + "px";
  }
};

const dragQuit = function (e) {
  isPressed = false;
};

mapBox.addEventListener("mousedown", dragDown);

window.addEventListener(
  "touchstart",
  function (event) {
    document.addEventListener(
      "touchmove",
      function (event) {
        console.log("drzewo");
      },
      true
    );
    document.addEventListener(
      "touchend",
      function (event) {
        console.log("bujakaszaend");
      },
      true
    );
  },
  true
);
