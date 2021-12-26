import * as VAR from "./Variables.js";
import { createPost, isStorage } from "./EventPage.js";

const addNewEventForm = document.getElementById("addNewEventForm");
const addNewEventFormHandler = (e) => {
  e.preventDefault();
};
addNewEventForm.removeEventListener("submit", addNewEventFormHandler);
addNewEventForm.addEventListener("submit", addNewEventFormHandler);
export const addNewEventHandler = () => {
  const addNewBtnHandler = () => {
    newObjectHandler();
    const confirmMessage = document.querySelector(".confirmMessage");
    confirmMessage.style.opacity = "1";
    if ((confirmMessage.style.opacity = "1")) {
      setTimeout(() => {
        confirmMessage.style.opacity = "0";
      }, 2000);
    }
  };
  VAR.addNewEventBtn.removeEventListener("click", addNewBtnHandler);
  VAR.addNewEventBtn.addEventListener("click", addNewBtnHandler);
};
export const newObjectHandler = () => {
  const newEvent = {
    name: VAR.addEventNameInput.value,
    date: VAR.addEventDateInput.value,
    description: VAR.addEventDescInput.value,
    id: Math.floor(Math.random() * 50000),
  };

  createPost(newEvent.name, newEvent.date, newEvent.description, newEvent.id);
  isStorage.push(newEvent);
  localStorage.setItem("API", JSON.stringify(isStorage));
  VAR.addEventNameInput.value = "";
  VAR.addEventDateInput.value = "";
  VAR.addEventDescInput.value = "";
};
