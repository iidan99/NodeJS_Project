var errorElement = document.querySelector(".error-message");
var errorPassword = document.querySelector(".signin-container-form--error");
function createUser(event) {
    event.preventDefault();
    if (event.target.elements.password.value !==
        event.target.elements.verifyPassword.value) {
        errorPassword.innerText = "Passwords do not match";
    }
    else {
        errorPassword.innerText = "";
        try {
            var user = {
                userName: event.target.elements.userName.value,
                firstName: event.target.elements.firstName.value,
                lastName: event.target.elements.lastName.value,
                email: event.target.elements.email.value,
                password: event.target.elements.password.value
            };
            var form = document.querySelector(".signin-container-form");
            form.reset();
            fetch("/sign-in", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data.errorMessage);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
function back() {
    window.location.replace("../");
}
