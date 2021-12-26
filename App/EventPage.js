import { privatePage1Id } from "../app.js";
import { newObjectHandler } from "./AddNewEvent.js";
import { router } from "./Router.js";
import * as VAR from "./Variables.js";

export const table = document.querySelector(".postList");
export const tableBody = document.querySelector(".postList__body");
let posts = "";

const sendHttp = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else;
      reject(new Error("Something went wrong!"));
    };

    xhr.onerror = function () {
      reject(new Error("Failerd to send request!"));
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
};
export let isStorage = [];

export async function fetchPost() {
  try {
    const resData = await sendHttp(
      "GET",
      "https://jsonplaceholder.typicode.com/users"
    );

    posts = resData;
    isStorage = !localStorage.getItem("API")
      ? posts
      : JSON.parse(localStorage.getItem("API"));

    for (let post of isStorage) {
      const date = new Date(post.date).toLocaleString();
      const trimedDate = date.split(",");

      const itemDate = trimedDate[0].replaceAll("/", ".");

      // const thead = document.createElement("thead");
      // thead.setAttribute("class", "postList__head");
      let desc = `${post.description}`;
      let descLenght = desc.length;

      // console.log(desc, descLenght);
      const limitedDescription = desc.slice(0, 25);

      const limitedDescr = descLenght <= 25 ? desc : `${limitedDescription}...`;
      // let limitedDescr = desc.slice(0, 25) + "...";

      const row = document.createElement("tr");
      row.setAttribute("class", "postList__item");
      row.setAttribute("id", `${post.id}`);
      row.innerHTML = `
      <td>${post.name}</td>
      <td class="limitDescr">${limitedDescr}</td>
      <td>${itemDate}</td>
      <td><button class="deleteBtn">Delete</button></td>
      <td><button class="editBtn">Edit</button></td>
      `;
      tableBody.append(row);
      const table = document.querySelector(".postList");
      table.innerHTML = `
      <thead class="postList__head">
      <tr>
       <th>Name</th>
         <th>Description</th>
         <th>Date</th>
         <th>Delete Event</th>
         <th>Edit Event</th>
       </tr>
      </thead>
      `;
      table.appendChild(tableBody);
      // const eventPage = document.querySelector(".privatePage1");
      // table.append(thead, tableBody);
    }
  } catch (error) {
    alert(error.message);
  }
}
// Delete row
const tableBodyHandler = (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Delete") {
      const item = e.target.closest("tr").id;
      // popup here
      VAR.deletePopup.style.display = "block";
      const yesDeleteHandler = () => {
        sendHttp(
          "DELETE",
          `https://jsonplaceholder.typicode.com/users/${item}`
        );
        e.target.closest("tr").remove();
        isStorage = isStorage.filter(
          (item) => +item.id !== +e.target.closest("tr").id
        );
        localStorage.setItem("API", JSON.stringify(isStorage));
        VAR.deletePopup.style.display = "none";
      };
      VAR.yesDelete.removeEventListener("click", yesDeleteHandler);
      VAR.yesDelete.addEventListener("click", yesDeleteHandler);
      const noDeleteHandler = () => {
        VAR.deletePopup.style.display = "none";
      };
      VAR.noDelete.removeEventListener("click", noDeleteHandler);
      VAR.noDelete.addEventListener("click", noDeleteHandler);
    }
    // Edit row
    if (e.target.innerText === "Edit") {
      location.hash = `${privatePage1Id}/editEvent`;
      router();
      tableBody.innerHTML = "";
      const findClickedItem = isStorage.find((item) =>
        +item.id === +e.target.closest("tr").id ? item : false
      );
      localStorage.setItem("clickedItem", JSON.stringify(findClickedItem));
      isStorage = isStorage.filter((item) => item !== findClickedItem);
      VAR.editName.value = findClickedItem.name;
      VAR.editDate.value = findClickedItem.date;
      VAR.editDesc.value = findClickedItem.description;
      const item = e.target.closest("tr").id;
      sendHttp("DELETE", `https://jsonplaceholder.typicode.com/users/${item}`);
      e.target.closest("tr").remove();
      VAR.editName.style.display = "block";
      VAR.editDate.style.display = "block";
      VAR.editDesc.style.display = "block";
      VAR.cancelBtn.style.display = "block";
      VAR.updateBtn.style.display = "block";
      VAR.noMoreEvents.style.display = "block";
    }
  }
};
tableBody.removeEventListener("click", tableBodyHandler);
tableBody.addEventListener("click", tableBodyHandler);

export function createPost(name, date, description, id) {
  const post = {
    id: id,
    name: name,
    username: date,
    email: description,
  };
  sendHttp("POST", "https://jsonplaceholder.typicode.com/users", post);
}

const editFormHandler = (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    const clickedItem = JSON.parse(localStorage.getItem("clickedItem"));

    if (e.target.innerText === "Update Event") {
      const newEvent = {
        name: VAR.editName.value,
        date: VAR.editDate.value,
        description: VAR.editDesc.value,
        id: clickedItem.id,
      };

      createPost(
        newEvent.name,
        newEvent.date,
        newEvent.description,
        newEvent.id
      );
      if (newEvent.name === "" && newEvent.description === "") {
        localStorage.setItem("API", JSON.stringify(isStorage));
        VAR.editName.value = "";
        VAR.editDate.value = "";
        VAR.editDesc.value = "";

        localStorage.setItem("API", JSON.stringify(isStorage));
        localStorage.removeItem("clickedItem");
        VAR.editName.style.display = "none";
        VAR.editDate.style.display = "none";
        VAR.editDesc.style.display = "none";
        VAR.cancelBtn.style.display = "none";
        VAR.updateBtn.style.display = "none";
        VAR.noMoreEvents.style.display = "block";
      } else {
        isStorage.push(newEvent);
        localStorage.setItem("API", JSON.stringify(isStorage));
        VAR.editName.value = "";
        VAR.editDate.value = "";
        VAR.editDesc.value = "";

        localStorage.setItem("API", JSON.stringify(isStorage));
        localStorage.removeItem("clickedItem");
        VAR.editName.style.display = "none";
        VAR.editDate.style.display = "none";
        VAR.editDesc.style.display = "none";
        VAR.cancelBtn.style.display = "none";
        VAR.updateBtn.style.display = "none";
        VAR.noMoreEvents.style.display = "block";
      }
      location.hash = `${privatePage1Id}/eventList`;
      router();
      fetchPost();
    }
    if (e.target.innerText === "Cancel") {
      if (isStorage !== "") {
        isStorage.push(clickedItem);
        localStorage.removeItem("clickedItem");
        VAR.editName.value = "";
        VAR.editDate.value = "";
        VAR.editDesc.value = "";
        location.hash = `${privatePage1Id}/eventList`;
        VAR.editName.style.display = "none";
        VAR.editDate.style.display = "none";
        VAR.editDesc.style.display = "none";
        VAR.cancelBtn.style.display = "none";
        VAR.updateBtn.style.display = "none";
        VAR.noMoreEvents.style.display = "block";
        location.hash = `${privatePage1Id}/eventList`;
        router();
        fetchPost();
      }
    }
  }
};

VAR.editItemForm.removeEventListener("click", editFormHandler);
VAR.editItemForm.addEventListener("click", editFormHandler);
