import * as VAR from "./Variables.js";
import { createPost } from "./EventPage.js";

export const addNewEventHandler = () => {
  let fetchItems = [];
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => fetchItems.push(...data));

  let array = JSON.parse(localStorage.getItem("API"));
  let isEmptyLocalStorage = !array ? fetchItems : array;

  VAR.addNewEventBtn.addEventListener("click", () => {
    newObjectHandler(
      VAR.addEventNameInput.value,
      VAR.addEventDateInput.value,
      VAR.addEventDescInput.value,
      Math.random() * 50000,
      isEmptyLocalStorage
    );
  });
};
export const newObjectHandler = (
  inputName,
  inputDate,
  inputDesc,
  id,
  storageArray
) => {
  const newEvent = {
    name: inputName,
    date: inputDate,
    description: inputDesc,
    id: id,
  };

  createPost(newEvent.name, newEvent.date, newEvent.description, newEvent.id);
  storageArray.push(newEvent);
  localStorage.setItem("API", JSON.stringify(storageArray));
  inputName = "";
  inputDate = "";
  inputDesc = "";
};
