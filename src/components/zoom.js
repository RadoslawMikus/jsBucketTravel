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
    mapBox.style.top = "0px";
    mapBox.style.left = "0px";
  }
};

zoomPlus.addEventListener("click", zoomIn);
zoomMinus.addEventListener("click", zoomOut);

// Funkcja po naciśnięciu i trzymaniu lewego przycisku myszy
// Zapisz moją pozycję X i Y względem okna
// Jak przesuwam myszkę trzymając, pamiętaj moją pozycję
// Odejmuj X i Y początkowe od aktualnego

let xBeg = 0,
  yBeg = 0,
  xAft = 0,
  yAft = 0;
let maxTopOffset = 0,
  minTopOffset = 0,
  maxLeftOffset = 0,
  minLeftOffset = 0;
export let isPressed = false;
let bbox;

const dragDown = function (e) {
  let europeMap = document.querySelector(".mapBox svg");
  xBeg = e.clientX;
  yBeg = e.clientY;

  isPressed = true;
  bbox = europeMap.getBBox();

  document.addEventListener("mousemove", dragMove, false);
  document.addEventListener("mouseup", dragQuit);
};

const dragMove = function (e) {
  if (isPressed == true) {
    xAft = xBeg - e.clientX;
    yAft = yBeg - e.clientY;
    xBeg = e.clientX;
    yBeg = e.clientY;

    if (mapBox.offsetTop > maxTopOffset) {
      mapBox.style.top = maxTopOffset - yAft + "px";
    } else if (mapBox.offsetTop < minTopOffset) {
      mapBox.style.top = minTopOffset - yAft + "px";
    } else {
      mapBox.style.top = mapBox.offsetTop - yAft + "px";
    }
    maxTopOffset = (bbox.height * currentScale - bbox.height) / 2;
    minTopOffset = maxTopOffset * -1;

    if (mapBox.offsetLeft > maxLeftOffset) {
      mapBox.style.left = maxLeftOffset - xAft + "px";
    } else if (mapBox.offsetLeft < minLeftOffset) {
      mapBox.style.left = minLeftOffset - xAft + "px";
    } else {
      mapBox.style.left = mapBox.offsetLeft - xAft + "px";
    }

    maxLeftOffset = (bbox.width * currentScale - bbox.width) / 2;
    minLeftOffset = maxLeftOffset * -1;
  }
};

const dragQuit = function (e) {
  isPressed = false;
};

mapBox.addEventListener("mousedown", dragDown);

const touchStartFunction = function (e) {
  xBeg = e.changedTouches[0].clientX;
  yBeg = e.changedTouches[0].clientY;

  isPressed = true;

  document.addEventListener("touchmove", touchMoveFunction, true);
  document.addEventListener("touchend", touchEndFunction, true);
};

const touchMoveFunction = function (e) {
  if (isPressed == true) {
    xAft = xBeg - e.changedTouches[0].clientX;
    yAft = yBeg - e.changedTouches[0].clientY;
    xBeg = e.changedTouches[0].clientX;
    yBeg = e.changedTouches[0].clientY;

    if (mapBox.offsetTop > maxTopOffset) {
      mapBox.style.top = maxTopOffset - yAft + "px";
    } else if (mapBox.offsetTop < minTopOffset) {
      mapBox.style.top = minTopOffset - yAft + "px";
    } else {
      mapBox.style.top = mapBox.offsetTop - yAft + "px";
    }
    maxTopOffset = (bbox.height * currentScale - bbox.height) / 2;
    minTopOffset = maxTopOffset * -1;

    if (mapBox.offsetLeft > maxLeftOffset) {
      mapBox.style.left = maxLeftOffset - xAft + "px";
    } else if (mapBox.offsetLeft < minLeftOffset) {
      mapBox.style.left = minLeftOffset - xAft + "px";
    } else {
      mapBox.style.left = mapBox.offsetLeft - xAft + "px";
    }

    maxLeftOffset = (bbox.width * currentScale - window.innerWidth) / 2;
    minLeftOffset = maxLeftOffset * -1;
  }
};

const touchEndFunction = function (e) {
  isPressed = false;
};

mapBox.addEventListener("touchstart", touchStartFunction);
