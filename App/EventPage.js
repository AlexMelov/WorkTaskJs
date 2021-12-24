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
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      console.log(xhr.response);
      console.log(xhr.status);
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
};

export async function fetchPost() {
  const resData = await sendHttp(
    "GET",
    "https://jsonplaceholder.typicode.com/users"
  );

  posts = resData;
  const isStorage = !localStorage.getItem("API")
    ? posts
    : JSON.parse(localStorage.getItem("API"));

  for (let post of isStorage) {
    const date = new Date(post.date).toLocaleString();
    const trimedDate = date.split(",");

    const itemDate = trimedDate[0].replaceAll("/", ".");

    const row = document.createElement("tr");
    row.setAttribute("class", "postList__item");
    row.setAttribute("id", `${post.id}`);
    row.innerHTML = `<td>${post.name}</td>
    <td>${post.description}</td>
    <td>${itemDate}</td>
    <td><button class="deleteBtn">Delete</button></td>
    <td><button class="editBtn">Edit</button></td>
    `;
    tableBody.appendChild(row);
    const eventPage = document.querySelector(".privatePage1");
    eventPage.appendChild(tableBody);
  }
}
// Delete row
tableBody.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Delete") {
      const item = e.target.closest("tr").id;
      sendHttp("DELETE", `https://jsonplaceholder.typicode.com/users/${item}`);
      e.target.closest("tr").remove();
    }
    // Edit row
    if (e.target.innerText === "Edit") {
      const pageLocation = location.href;
      const pageHash = pageLocation.split("/")[3];
      location.hash = `${pageHash}/editEvent`;
      router();
      tableBody.innerHTML = "";
      const itemStorage = JSON.parse(localStorage.getItem("API"));

      const findClickedItem = itemStorage.find((item) =>
        +item.id === +e.target.closest("tr").id ? item : false
      );
      localStorage.setItem("clickedItem", JSON.stringify(findClickedItem));

      VAR.editName.value = findClickedItem.name;
      VAR.editDate.value = findClickedItem.date;
      VAR.editDesc.value = findClickedItem.description;
    }
  }
});

export function createPost(name, date, description, id) {
  const post = {
    id: id,
    name: name,
    username: date,
    email: description,
  };
  sendHttp("POST", "https://jsonplaceholder.typicode.com/users", post);
}

VAR.editItemForm.addEventListener("click", (e) => {
  e.preventDefault;
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Update Event") {
      const clickedItem = JSON.parse(localStorage.getItem("clickedItem"));
      const storageArray = JSON.parse(localStorage.getItem("API"));
      newObjectHandler(
        VAR.editName.value,
        VAR.editDate.value,
        VAR.editDesc.value,
        clickedItem.id,
        storageArray
      );
      const removeClickedItem = storageArray.filter(
        (item) => !item === clickedItem
      );
      localStorage.setItem("API", removeClickedItem);
    }
    if (e.target.innerText === "Cancel") {
      const clickedItem = JSON.parse(localStorage.getItem("clickedItem"));
      const listItems = JSON.parse(localStorage.getItem("API"));
      listItems.push(clickedItem);
      localStorage.removeItem("clickedItem");
      VAR.editName.value = "";
      VAR.editDate.value = "";
      VAR.editDesc.value = "";
    }
  }
});
