export const table = document.querySelector(".postList");
export const tableBody = document.querySelector(".postList__body");

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
  const posts = resData;

  for (let post of posts) {
    const row = document.createElement("tr");
    row.setAttribute("class", "postList__item");
    row.setAttribute("id", `${post.id}`);
    row.innerHTML = `<td>${post.username}</td>
    <td>${post.name}</td>
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
    if (e.target.innerText === "Edit") {
      console.log("Edit");
    }
  }
});
