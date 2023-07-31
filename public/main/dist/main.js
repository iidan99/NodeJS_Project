var userLogin = JSON.parse(localStorage.getItem("user"));
function logOut() {
    localStorage.removeItem("user");
    window.location.replace("../");
}
function renderPosts(data) {
    var postHtml = document.querySelector(".posts-list");
    postHtml.innerHTML = "<div>\n  <h3>" + data.userName + "</h3>\n  <p>" + data.date + "</p>\n  </div>\n  <div>\n  " + getComments(data.postID) + "\n  </div>";
}
function getComments(postID) {
    var commentsData = [];
    fetch("/get-comments", {
        method: "Patch",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postID: postID
        })
    }).then(function (res) {
        return res.json().then(function (data) {
            console.log(data);
            commentsData = data;
        });
    });
    return commentsData;
}
function createPost(event) {
    event.preventDefault();
    var description = event.target.elements.description.value;
    if (!description) {
        console.log("description is missing");
    }
    else {
        fetch("/create-post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description,
                userName: userLogin.name,
                user_ID: userLogin.userID
            })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var data = _a.data;
            console.log(data);
        })["catch"](function (error) {
            console.log(error);
        });
        resetForm();
    }
}
function resetForm() {
    var form = document.querySelector(".post-form");
    form.reset();
}
