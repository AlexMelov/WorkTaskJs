import * as VAR from "./App/Variables.js";
import { database } from "./App/Database.js";
import { router } from "./App/Router.js";
import { fetchPost, tableBody } from "./App/EventPage.js";

const storageBase = JSON.parse(localStorage.getItem("array"));
const isStorage = storageBase !== null ? storageBase : database;

window.addEventListener("load", () => {
  eventPage.innerHTML = "";
  location.hash = "";
  router();
});

VAR.loginForm.addEventListener("submit", loginFormHandler);

VAR.signUpBtn.addEventListener("click", () => {
  eventPage.innerHTML = "";
  location.href = "#signUp";
  router();
});

VAR.backToHome.addEventListener("click", () => {
  eventPage.innerHTML = "";
  location.hash = "#signIn";
  router();
});
export let privatePage1Id = "";
const privatePage1 = document.querySelector(".privatePage1");

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
      privatePage1.setAttribute("id", Math.random());
      privatePage1Id = privatePage1.getAttribute("id");
      location.hash = `${privatePage1Id}/addNewEvent`;
      createNavbar();
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
  privatePage1.setAttribute("id", Math.random());
  privatePage1Id = privatePage1.getAttribute("id");
  location.hash = `#${privatePage1Id}/addNewEvent`;
  router();
  VAR.newUserFirstName.value = "";
  VAR.newUserLastName.value = "";
  VAR.newUserUsername.value = "";
  VAR.newUserEmail.value = "";
  VAR.newUserPhone.value = "";
  VAR.newUserPassword.value = "";
};

const createNavbar = () => {
  const navbar = document.createElement("nav");
  navbar.setAttribute("class", "navbar");

  navbar.innerHTML = `
<nav class="navbar">
          <div class="navbar__logo">
            <img src="./img/logo.png" alt="logo" id="homeLogo" />
          </div>
          <ul class="navbar__items">
            <li class="navbar__items--item">
              <p id="addEventLink">Add New Event</p>
            </li>
            <li class="navbar__items--item">
              <p id="editEventLink">Edit Event</p>
            </li>
            <li class="navbar__items--item">
              <p id="eventListLink">List Event</p>
            </li>
          </ul>
          <div class="navbar__input">
            <i class="fas fa-search"></i>
            <input
              type="search"
              name="search"
              id="searchBtn"
              placeholder="search"
            />
          </div>
        </nav>
`;
  VAR.eventPage.appendChild(navbar);
  const homeLogo = navbar.querySelector("#homeLogo");
  const editEventLink = navbar.querySelector("#editEventLink");
  const eventListLink = navbar.querySelector("#eventListLink");
  const addNewEventLink = navbar.querySelector("#addEventLink");

  homeLogo.addEventListener("click", () => {
    VAR.errorUser.style.display = "none";
    VAR.errorPass.style.display = "none";
    VAR.eventPage.innerHTML = "";
    location.hash = "";
    tableBody.innerHTML = "";
    eventPage.innerHTML = "";
    router();
  });
  editEventLink.addEventListener("click", () => {
    location.hash = `${privatePage1Id}/editEvent`;
    tableBody.innerHTML = "";
    VAR.eventPage.innerHTML = "";
    createNavbar();
    router();
  });
  eventListLink.addEventListener("click", () => {
    location.hash = `${privatePage1Id}/eventList`;
    router();
    tableBody.innerHTML = "";
    VAR.eventPage.innerHTML = "";
    fetchPost();
    createNavbar();
  });
  addNewEventLink.addEventListener("click", () => {
    location.hash = `${privatePage1Id}/addNewEvent`;
    tableBody.innerHTML = "";
    VAR.eventPage.innerHTML = "";
    router();
    createNavbar();
  });
};

VAR.registerUser.addEventListener("click", addNewUser);

router();
