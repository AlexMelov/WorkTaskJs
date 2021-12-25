import * as VAR from "./Variables.js";
import { createPost, isStorage } from "./EventPage.js";

export const addNewEventHandler = () => {
  VAR.addNewEventBtn.addEventListener("click", () => {
    newObjectHandler();
  });
};
export const newObjectHandler = () => {
  const newEvent = {
    name: VAR.addEventNameInput.value,
    date: VAR.addEventDateInput.value,
    description: VAR.addEventDescInput.value,
    id: Math.random() * 50000,
  };

  createPost(newEvent.name, newEvent.date, newEvent.description, newEvent.id);
  isStorage.push(newEvent);
  localStorage.setItem("API", JSON.stringify(isStorage));
  VAR.addEventNameInput.value = "";
  VAR.addEventDateInput.value = "";
  VAR.addEventDescInput.value = "";
};
