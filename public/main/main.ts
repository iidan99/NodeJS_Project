const userLogin = JSON.parse(localStorage.getItem("user")!);

function logOut() {
  localStorage.removeItem("user");
  window.location.replace("../");
}

function renderPosts(data) {
  const postHtml = document.querySelector(".posts-list") as HTMLDListElement;
  postHtml.innerHTML = `<div>
  <h3>${data.userName}</h3>
  <p>${data.date}</p>
  </div>
  <div>
  ${getComments(data.postID)}
  </div>`;
}

function getComments(postID: string) {
  let commentsData = [];
  fetch("/get-comments", {
    method: "Patch",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID: postID,
    }),
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
      commentsData = data;
    })
  );
  return commentsData;
}

function createPost(event) {
  event.preventDefault();
  const description = event.target.elements.description.value;
  if (!description) {
    console.log("description is missing");
  } else {
    fetch("/create-post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        userName: userLogin.name,
        user_ID: userLogin.userID,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  }
}

function resetForm() {
  const form = document.querySelector(".post-form") as HTMLFormElement;
  form.reset();
}
