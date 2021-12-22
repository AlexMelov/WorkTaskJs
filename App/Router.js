import * as VAR from "./Variables.js";

export const router = () => {
  const hash = location.hash;
  if (hash === "" || hash.includes("#signIn")) {
    VAR.signInPage.style.display = "block";
    VAR.signUpPage.style.display = "none";
    VAR.eventPage.style.display = "none";
  } else {
    if (hash.includes("#signUp")) {
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "block";
      VAR.eventPage.style.display = "none";
    } else if (hash.includes("#eventPage")) {
      VAR.signInPage.style.display = "none";
      VAR.signUpPage.style.display = "none";
      VAR.eventPage.style.display = "block";
    }
  }
};
