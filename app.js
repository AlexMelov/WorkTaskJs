import * as VAR from "./App/Variables.js";
import { database } from "./App/Database.js";
import { router } from "./App/Router.js";
import { createPost, fetchPost, tableBody } from "./App/EventPage.js";
import { addNewEventHandler } from "./App/AddNewEvent.js";
import { privatePage1 } from "./App/Variables.js";

export let privatePage1Id = "";
// export const privatePage1 = document.querySelector(".privatePage1");
// privatePage1.setAttribute("id", Math.floor(Math.random() * 1000));

let isStorage = "";
setInterval(() => {
  const storageBase = JSON.parse(localStorage.getItem("array"));
  isStorage = storageBase !== null ? storageBase : database;
}, 1000);

const navMenuStart = document.querySelectorAll(".menuBar");
// navMenuStart.setAttribute("class", "menuBar");
navMenuStart.forEach((item) => {
  item.innerHTML = `
  <button class="backToHome">Login</button>
  <button class="submitBtnsignUp">Register</button>
  `;
});
VAR.loginForm.removeEventListener("submit", loginFormHandler);
VAR.loginForm.addEventListener("submit", loginFormHandler);

const signUpForm = document.getElementById("signUpForm");
const signUpFormHandler = (e) => {
  e.preventDefault();
};
signUpForm.removeEventListener("submit", signUpFormHandler);
signUpForm.addEventListener("submit", signUpFormHandler);

const signUpBtn = document.querySelectorAll(".submitBtnsignUp");
const backToHome = document.querySelectorAll(".backToHome");

const signUpFunction = () => {
  eventPage.innerHTML = "";
  location.href = "#signUp";
  router();
};
signUpBtn.forEach((item) => {
  item.removeEventListener("click", signUpFunction);
  item.addEventListener("click", signUpFunction);
});

const backToHomeFunc = () => {
  eventPage.innerHTML = "";
  location.hash = "";
  router();
};
backToHome.forEach((item) => {
  item.removeEventListener("click", backToHomeFunc);
  item.addEventListener("click", backToHomeFunc);
});

const loginHanler = () => {
  VAR.eventPage.innerHTML = "";
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
      privatePage1Id = privatePage1.getAttribute("id");
      // const secureRoute = privatePage1Id;
      // localStorage.setItem("route", secureRoute);
      localStorage.setItem("user", JSON.stringify(item));
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
};

function loginFormHandler(e) {
  e.preventDefault();
  loginHanler();
}

const addNewUser = () => {
  const inputs = [
    VAR.newUserFirstName,
    VAR.newUserLastName,
    VAR.newUserUsername,
    VAR.newUserEmail,
    VAR.newUserPhone,
    VAR.newUserPassword,
  ];

  const errorInput = inputs.filter((input) => (!input.value ? input : false));
  const popUpBanner = document.querySelector(".popUpBanner");

  if (errorInput.length !== 0) {
    VAR.eventPage.innerHTML = "";
    errorInput.forEach((item) => {
      popUpBanner.innerHTML = `
    <div class="popUpErrorSignUp">
    <h2>Please fill the ${item.placeholder}</h2>
    </div>`;
    });
  } else {
    VAR.eventPage.innerHTML = "";
    popUpBanner.innerHTML = "";
    const newObj = {
      firstName: VAR.newUserFirstName.value,
      lastName: VAR.newUserLastName.value,
      username: VAR.newUserUsername.value,
      email: VAR.newUserEmail.value,
      phone: VAR.newUserPhone.value,
      password: VAR.newUserPassword.value,
      id: Math.floor(Math.random(5000)),
    };
    database.push(newObj);
    localStorage.setItem("user", JSON.stringify(newObj));
    localStorage.setItem("array", JSON.stringify(database));
    privatePage1.setAttribute("id", Math.floor(Math.random() * 1000));
    privatePage1Id = privatePage1.getAttribute("id");
    location.hash = `#${privatePage1Id}/addNewEvent`;

    router();
    VAR.newUserFirstName.value = "";
    VAR.newUserLastName.value = "";
    VAR.newUserUsername.value = "";
    VAR.newUserEmail.value = "";
    VAR.newUserPhone.value = "";
    VAR.newUserPassword.value = "";
  }
};

export const createNavbar = () => {
  const navbar = document.createElement("nav");
  navbar.setAttribute("class", "navbar");

  navbar.innerHTML = `
          <a href="#" class="hambLink"><i class="fas fa-bars"></i></a>
          <div class="navbar__logo">
            <img src="./img/logo.png" alt="logo" id="homeLogo" />
          </div>
          <ul class="navbar__items">
            <li class="navbar__items--item">
              <a href="#" id="addEventLink">Add New Event</a>
            </li>
            
            <li class="navbar__items--item">
              <a href="#" id="eventListLink">List Event</a>
            </li>
            <li class="navbar__items--item">
            <a href="#" class="logoutBtn">Logout</a>
            </li>
          </ul>
         
       
`;
  const hambMenu = navbar.querySelector(".hambLink");
  const hamburgeMenuhandler = () => {
    const navItem = document.querySelectorAll(".navbar__items--item");
    navItem.forEach((item) => {
      if (item.style.transform === "scale(1)") {
        // item.style.display = "block";
        item.style.transform = "scale(0)";
        item.style.opacity = "0";
      } else {
        // item.style.display = "none";
        item.style.transform = "scale(1)";
        item.style.opacity = "1";
      }
    });
  };

  hambMenu.addEventListener("click", hamburgeMenuhandler);

  VAR.eventPage.appendChild(navbar);
  const homeLogo = navbar.querySelector("#homeLogo");
  const eventListLink = navbar.querySelector("#eventListLink");
  const addNewEventLink = navbar.querySelector("#addEventLink");
  const editEventLink = navbar.querySelector("#editEventLink");

  const eventList = () => {
    location.hash = `${privatePage1Id}/eventList`;
    router();
    tableBody.innerHTML = "";
    VAR.eventPage.innerHTML = "";
    fetchPost();
    createNavbar();
  };
  homeLogo.removeEventListener("click", eventList);
  homeLogo.addEventListener("click", eventList);

  // const editEventLinkHandler = () => {
  //   location.hash = `${privatePage1Id}/editEvent`;
  //   tableBody.innerHTML = "";
  //   VAR.eventPage.innerHTML = "";
  //   createNavbar();
  //   router();
  //   if (
  //     VAR.editName.value === "" &&
  //     VAR.editDate.value === "" &&
  //     VAR.editDesc.value === ""
  //   ) {
  //     VAR.editName.style.display = "none";
  //     VAR.editDate.style.display = "none";
  //     VAR.editDesc.style.display = "none";
  //     VAR.cancelBtn.style.display = "none";
  //     VAR.updateBtn.style.display = "none";
  //   }
  // };
  // editEventLink.removeEventListener("click", editEventLinkHandler);
  // editEventLink.addEventListener("click", editEventLinkHandler);

  eventListLink.removeEventListener("click", eventList);
  eventListLink.addEventListener("click", eventList);

  const addNewEventLinkHandler = () => {
    location.hash = `${privatePage1Id}/addNewEvent`;
    tableBody.innerHTML = "";
    VAR.eventPage.innerHTML = "";
    router();
    createNavbar();
  };
  addNewEventLink.removeEventListener("click", addNewEventLinkHandler);
  addNewEventLink.addEventListener("click", addNewEventLinkHandler);

  const logoutBtn = document.querySelector(".logoutBtn");

  const logoutBtnHandler = () => {
    location.hash = "";
    router();
    // location.reload();
    localStorage.removeItem("user");
  };

  logoutBtn.removeEventListener("click", logoutBtnHandler);
  logoutBtn.addEventListener("click", logoutBtnHandler);
};

const registerUserHandler = (e) => {
  e.preventDefault();

  addNewUser();
  createNavbar();
};
VAR.registerUser.removeEventListener("click", registerUserHandler);
VAR.registerUser.addEventListener("click", registerUserHandler);

addNewEventHandler();
router();
VAR.deletePopup.style.display = "none";
VAR.noMoreEvents.style.display = "block";
