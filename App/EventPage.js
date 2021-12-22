const ul = document.querySelector(".listOfPosts");
export const sendHttp = (method, url, data) => {
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
  console.log(posts);
  for (let post of posts) {
    const postItem = document.createElement("li");
    ul.setAttribute("class", "postList");
    postItem.setAttribute("class", "postList__item");
    postItem.setAttribute("id", `${post.id}`);
    postItem.innerHTML = `
    <h2>${post.username}</h2>
    <p>${post.name}</p>
    <button class="deleteBtn">Button</button>
    `;
    ul.appendChild(postItem);
    const eventPage = document.querySelector(".privatePage1");
    eventPage.appendChild(ul);
  }
}

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const item = e.target.closest("li").id;
    sendHttp("DELETE", `https://jsonplaceholder.typicode.com/users/${item}`);
    e.target.closest("li").remove();
  }
});
