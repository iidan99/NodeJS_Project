const userLogin = JSON.parse(localStorage.getItem("user")!);
const postHtml = document.querySelector(".posts-list") as HTMLDListElement;

let commentsList = [];

function resetForm() {
  const form = document.querySelector(".post-form") as HTMLFormElement;
  form.reset();
}

function renderPosts(data: []) {
  data.postsList.map((res) => {
    getComments(res);
  });
}

getPosts();
function logOut() {
  localStorage.removeItem("user");
  window.location.replace("../");
}

function getPosts() {
  postHtml.innerHTML = "";
  fetch("/get-posts")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderPosts(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getComments(post) {
  console.log(post);

  let commentsData = [];
  fetch("/get-comments", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID: post._id,
    }),
  }).then((res) =>
    res.json().then((data) => {
      commentsData = data.commentsList;
      renderPostToScreen(commentsData, post);
    })
  );
}

function renderPostToScreen(comment, post) {
  console.log("this is :", comment, post);

  const commentsHtml = comment
    .map(
      (res) => `
    <div class="post-comment-container-data">
    <h4>${res.userName}</h4>
    <p>${res.description}</p>
    <p>${res.date}</p>
    ${deleteBtn(res.user_ID, res._id)}
    </div>`
    )
    .join("");

  postHtml.innerHTML += `<div class="post">
    <h3>${post.userName}</h3>
    <p>${post.date}</p>
    <div>${post.description}</div>
    <div class="post-comment">  
    <p>Comments</p>
    <div class="post-comment-container"> 
   ${commentsHtml}
    </div>
    <form class="post-comment-form" onsubmit="addComment(event, '${post._id}')">
    <textarea name="description" placeholder="Add Comment"></textarea>
    <button type="submit">send</button>
    </form>
    </div>`;
}

function deleteBtn(userID: string, commentID: string) {
  if (userID === userLogin.userID) {
    return `<button onclick=(deleteComment("${commentID}"))>Delete</button>`;
  }
  return "";
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
        getPosts();
      })
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  }
}

function addComment(event, postId) {
  event.preventDefault();
  const description = event.target.elements.description.value;

  fetch("/create-comment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: description,
      postID: postId,
      userID: userLogin.userID,
    }),
  }).then((res) =>
    res
      .json()
      .then((data) => {
        getPosts();
      })
      .catch((error) => {})
  );
}

function deleteComment(commentID: string) {
  fetch("/delete-comment", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      getPosts();
    })
    .catch((error) => {
      console.log(error);
    });
}
