// import { UserInterface } from "../interface/user_Interface";
function createUser(event) {
    event.preventDefault();
    var user = {
        userName: event.target.elements.userName.value,
        firstName: event.target.elements.firstName.value,
        lastName: event.target.elements.lastName.value,
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    };
    fetch("/sign-in", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(function (res) { return res.json(); })["catch"](function (error) {
        console.log(error);
    });
}
