var userLogin = JSON.parse(localStorage.getItem("user"));
var postHtml = document.querySelector(".posts-list");
var commentsList = [];
function resetForm() {
    var form = document.querySelector(".post-form");
    form.reset();
}
function renderPosts(data) {
    data.postsList.map(function (res) {
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
        .then(function (res) { return res.json(); })
        .then(function (data) {
        renderPosts(data);
    })["catch"](function (error) {
        console.log(error);
    });
}
function getComments(post) {
    var commentsData = [];
    fetch("/get-comments", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postID: post._id
        })
    }).then(function (res) {
        return res.json().then(function (data) {
            commentsData = data.commentsList;
            renderPostToScreen(commentsData, post);
        });
    });
}
function renderPostToScreen(comment, post) {
    var commentsHtml = comment
        .map(function (res) { return "\n    <div class=\"post-comment-container-data\">\n    <h4>" + res.userName + "</h4>\n    <p>" + res.description + "</p>\n    <p>" + res.date + "</p>\n    " + deleteBtn(res.user_ID, res._id) + "\n    </div>"; })
        .join("");
    postHtml.innerHTML += "<div class=\"post\">\n    <h3>" + post.userName + "</h3>\n    <p>" + post.date + "</p>\n    <div>" + post.description + "</div>\n    <div class=\"post-comment\">  \n    <p>Comments</p>\n    <div class=\"post-comment-container\"> \n   " + commentsHtml + "\n    </div>\n    <form class=\"post-comment-form\" onsubmit=\"addComment(event, '" + post._id + "')\">\n    <textarea name=\"description\" placeholder=\"Add Comment\"></textarea>\n    <button type=\"submit\">send</button>\n    </form>\n    </div>";
}
function deleteBtn(userID, commentID) {
    if (userLogin === null) {
        logOut();
    }
    else if (userID === userLogin.userID) {
        return "<button onclick=(deleteComment(\"" + commentID + "\"))>Delete</button>";
    }
    return "";
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
            getPosts();
        })["catch"](function (error) {
            console.log(error);
        });
        resetForm();
    }
}
function addComment(event, postId) {
    event.preventDefault();
    var description = event.target.elements.description.value;
    fetch("/create-comment", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: description,
            postID: postId,
            userID: userLogin.userID
        })
    }).then(function (res) {
        return res
            .json()
            .then(function (data) {
            getPosts();
        })["catch"](function (error) { });
    });
}
function deleteComment(commentID) {
    fetch("/delete-comment", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentID: commentID
        })
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        getPosts();
    })["catch"](function (error) {
        console.log(error);
    });
}
