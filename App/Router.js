import * as VAR from "./Variables.js";
import { privatePage1Id } from "../app.js";

export const router = () => {
  VAR.addNewEventPage.setAttribute("id", `${privatePage1Id}/addNewEvent`);
  VAR.editEventPage.setAttribute("id", `${privatePage1Id}/editEvent`);
  VAR.eventList.setAttribute("id", `${privatePage1Id}/eventList`);

  const hash = location.hash;
  if (hash === "" || hash.includes("#signIn")) {
    VAR.signInPage.style.display = "block";
    VAR.signUpPage.style.display = "none";
    VAR.privatePage1.style.display = "none";
  } else {
    if (hash.includes("#signUp")) {
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "block";
      VAR.addNewEventPage.style.display = "none";
      VAR.editEventPage.style.display = "none";
      VAR.eventList.style.display = "none";
    } else if (hash.includes(`#${VAR.addNewEventPage.id}`)) {
      VAR.privatePage1.style.display = "block";
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "none";
      VAR.addNewEventPage.style.display = "block";
      VAR.editEventPage.style.display = "none";
      VAR.eventList.style.display = "none";
    } else if (hash.includes(`#${VAR.editEventPage.id}`)) {
      VAR.privatePage1.style.display = "block";
      VAR.editEventPage.style.display = "block";
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "none";
      VAR.addNewEventPage.style.display = "none";
      VAR.eventList.style.display = "none";
    } else if (hash.includes(`#${VAR.eventList.id}`)) {
      VAR.privatePage1.style.display = "block";
      VAR.editEventPage.style.display = "none";
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "none";
      VAR.addNewEventPage.style.display = "none";
      VAR.eventList.style.display = "block";
    }
  }
};
