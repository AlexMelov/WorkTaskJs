import * as VAR from "./Variables.js";
import { createPost } from "./EventPage.js";

export const addNewEventHandler = () => {
  VAR.addNewEventBtn.addEventListener("click", () => {
    const newEvent = {
      name: VAR.addEventNameInput.value,
      date: VAR.addEventDateInput.value,
      description: VAR.addEventDescInput.value,
      id: Math.random() * 50000,
    };
    createPost(newEvent.name, newEvent.date, newEvent.description, newEvent.id);
  });
};
