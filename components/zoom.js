// -----------------------------
// DECLARATIONS
// -----------------------------
const zoomPlus = document.querySelector("#zoomPlus");
const zoomMinus = document.querySelector("#zoomMinus");
const europeMap = document.querySelector(".mapBox svg");
const mapBox = document.querySelector(".mapBox");
export let isReadyToClick;
let isPressed;
let currentScale = 1;

// -----------------------------
// ZOOM MAP IN AND ZOOM MAP OUT
// -----------------------------
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

let xBeg = 0,
  yBeg = 0,
  xAft = 0,
  yAft = 0;
let maxTopOffset = 0,
  minTopOffset = 0,
  maxLeftOffset = 0,
  minLeftOffset = 0;
isPressed = false;
let bbox;

// -----------------------------------
// CLICK MAP - MOUSE/TOUCH CLICK
// -----------------------------------
const dragDown = function (e) {
  isReadyToClick = true;
  isPressed = true;
  let europeMap = document.querySelector(".mapBox svg");
  e.clientX ? (xBeg = e.clientX) : (xBeg = e.changedTouches[0].clientX);
  e.clientY ? (yBeg = e.clientY) : (yBeg = e.changedTouches[0].clientY);

  bbox = europeMap.getBBox();

  if (e.clientX || e.clientY) {
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragQuit);
  } else if (e.changedTouches[0].clientX || e.changedTouches[0].clientY) {
    document.addEventListener("touchmove", dragMove, true);
    document.addEventListener("touchend", dragQuit, true);
  }
};

mapBox.addEventListener("mousedown", dragDown);
mapBox.addEventListener("touchstart", dragDown);

// ----------------------------
// MOVE MAP - MOUSE/TOUCH MOVE
// ----------------------------
const dragMove = function (e) {
  if (isPressed === true) {
    isPressed = true;
    isReadyToClick = false;

    if (e.clientX) {
      xAft = xBeg - e.clientX;
      yAft = yBeg - e.clientY;
      xBeg = e.clientX;
      yBeg = e.clientY;
    } else {
      xAft = xBeg - e.changedTouches[0].clientX;
      yAft = yBeg - e.changedTouches[0].clientY;
      xBeg = e.changedTouches[0].clientX;
      yBeg = e.changedTouches[0].clientY;
    }

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

// ----------------------------
// LEAVE MAP - MOUSE/TOUCH LEAVE
// ----------------------------
const dragQuit = function (e) {
  isPressed = false;
  setTimeout(() => (isReadyToClick = true), 10);

  if (e.clientX || e.clientY) {
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragQuit);
  } else if (e.changedTouches[0].clientX || e.changedTouches[0].clientY) {
    document.removeEventListener("touchmove", dragMove, true);
    document.removeEventListener("touchend", dragQuit, true);
  }
};
