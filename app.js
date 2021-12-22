import * as VAR from "./App/Variables.js";
import { database } from "./App/Database.js";
import { router } from "./App/Router.js";

const storageBase = JSON.parse(localStorage.getItem("array"));
const isStorage = storageBase !== "" ? storageBase : database;
VAR.homeLogo.addEventListener("click", () => {
  VAR.errorUser.style.display = "none";
  VAR.errorPass.style.display = "none";
  location.hash = "";
  router();
});

VAR.loginForm.addEventListener("submit", loginFormHandler);

VAR.signUpBtn.addEventListener("click", () => {
  location.href = "#signUp";
  router();
});

VAR.backToHome.addEventListener("click", () => {
  location.hash = "signIn";
  router();
});

function loginFormHandler(e) {
  e.preventDefault();
  const passValue = VAR.loginPassInput.value;
  const filterItem = isStorage.filter((item) =>
    item.username === VAR.loginPageUsername.value ? true : false
  );
  const filterPass = isStorage.filter((item) =>
    item.password === passValue ? true : false
  );

  isStorage.forEach((item) => {
    if (
      item.username === VAR.loginPageUsername.value &&
      item.password === passValue
    ) {
      location.hash = "#eventPage";
      router();
      loginPagePassword.value = "";
      VAR.loginPageUsername.value = "";
    }
  });

  filterItem.filter((item) =>
    item.username === VAR.loginPageUsername.value &&
    filterPass.filter((item) => item.password !== passValue)
      ? (VAR.errorPass.style.display = "block")
      : null
  );

  if (!filterItem[0]) {
    VAR.errorPass.style.display = "block";
    VAR.errorUser.style.display = "block";
  }
}
const addNewUser = () => {
  const newObj = {
    firstName: VAR.newUserFirstName.value,
    lastName: VAR.newUserLastName.value,
    username: VAR.newUserUsername.value,
    email: VAR.newUserEmail.value,
    phone: VAR.newUserPhone.value,
    password: VAR.newUserPassword.value,
    id: Math.random(5000),
  };
  database.push(newObj);
  localStorage.setItem("array", JSON.stringify(database));
  location.hash = "#eventPage";
  router();
  VAR.newUserFirstName.value = "";
  VAR.newUserLastName.value = "";
  VAR.newUserUsername.value = "";
  VAR.newUserEmail.value = "";
  VAR.newUserPhone.value = "";
  VAR.newUserPassword.value = "";
};
VAR.registerUser.addEventListener("click", addNewUser);
router();
