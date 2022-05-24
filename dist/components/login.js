/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// --------------------------------
// LOGIN AND PASSWORD
// --------------------------------
const login = "projekt@wsb.pl";
const password = "wsb";

// --------------------------------
// DECLARATIONS
// --------------------------------
const inputEmail = document.querySelector("#inputLoginEmail");
const inputPass = document.querySelector("#inputLoginPass");
const loginButton = document.querySelector("#loginButton");
const formMessageError = document.querySelector(".form-message-error");
const createAccountEmail = document.querySelector("#inputCreateEmail");
const createButton = document.querySelector("#createButton");
const createPass = document.querySelector("#inputCreatePass");
const createPassConfirm = document.querySelector("#inputCreatePassConfirm");
const createEmailError = document.querySelector(".form-create-error");
const createPassError = document.querySelector(".form-pass-error");
const forgotPass = document.querySelector("#inputForgotPass");
const forgotPassError = document.querySelector(".form-forgot-error");
const forgotButton = document.querySelector("#forgotButton");
const loginComponent = document.querySelector(".loginComponent");

// --------------------------------
// REMEMBER IF LOGGED IN
// --------------------------------
let areYouLoggedMemory = sessionStorage.getItem("areYouLogged");

const isLogged = () => {
  if (areYouLoggedMemory === "true") {
    loginComponent.classList.add("d-none");
  }
};

isLogged();

window.addEventListener("hashchange", isLogged);

// --------------------------------
// CREATE FORM
// --------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");
  const forgotPassForm = document.querySelector("#forgotPass");

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form-hidden");
    createAccountForm.classList.add("form-hidden");
    forgotPassForm.classList.add("form-hidden");
  });

  // --------------------------------
  // CREATE ACCOUNT
  // --------------------------------
  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form-hidden");
      createAccountForm.classList.remove("form-hidden");
      forgotPassForm.classList.add("form-hidden");
    });

  // --------------------------------
  // FORGOT PASSWORD
  // --------------------------------
  document.querySelector("#linkForgotPass").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form-hidden");
    createAccountForm.classList.add("form-hidden");
    forgotPassForm.classList.remove("form-hidden");
  });
});

// --------------------------------
// DATA VALIDATION
// --------------------------------
loginButton.addEventListener("click", loginValid);

function loginValid() {
  if (inputEmail.value == login && inputPass.value == password) {
    loginComponent.classList.add("d-none");
    sessionStorage.setItem(
      "areYouLogged",
      loginComponent.classList.contains("d-none")
    );
  } else {
    inputEmail.classList.add("form-input-error");
    inputPass.classList.add("form-input-error");
    formMessageError.innerHTML = "Podaj prawidłowe dane!";
  }
}
createAccountEmail.addEventListener("blur", () => {
  if (createAccountEmail.value.match(/@/)) {
    createAccountEmail.classList.add("form-input-succes");
    createAccountEmail.classList.remove("form-input-error");
    createEmailError.innerHTML = "";
  } else {
    createAccountEmail.classList.add("form-input-error");
    createEmailError.innerHTML = "Podaj prawidłowy email!";
  }
});

createPass.addEventListener("blur", passValid);
createPassConfirm.addEventListener("blur", passValid);

function passValid() {
  if (createPass.value.length == 0 || createPassConfirm.value.length == 0) {
    createPass.classList.add("form-input-error");
    createPassConfirm.classList.add("form-input-error");
    createPassError.innerHTML = "Wpisz hasło";
  } else if (createPass.value != createPassConfirm.value) {
    createPassError.innerHTML = "Hasła nie są identyczne";
  } else {
    createPass.classList.remove("form-input-error");
    createPass.classList.add("form-input-succes");
    createPassConfirm.classList.remove("form-input-error");
    createPassConfirm.classList.add("form-input-succes");
    createPassError.innerHTML = "";
    createButton.removeAttribute("disabled");
  }
}

// --------------------------------
// LOG IN
// --------------------------------
createButton.addEventListener("click", (e) => {
  if (
    createPass.value == createPassConfirm.value &&
    createAccountEmail.value.match(/@/)
  ) {
    e.preventDefault();
    window.location.href = "/index.html";
  } else {
    createButton.setAttribute("disabled", "false");
  }
});

// --------------------------------
// FORGOT PASSWORD
// --------------------------------
forgotPass.addEventListener("blur", () => {
  if (forgotPass.value.length == 0 || !forgotPass.value.match(/@/)) {
    forgotPassError.innerHTML = "Podaj poprawny adres email!";
    forgotPass.classList.add("form-input-error");
  } else {
    forgotPassError.innerHTML = "";
    forgotPass.classList.remove("form-input-error");
    forgotButton.removeAttribute("disabled");
  }
});

/******/ })()
;