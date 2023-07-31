const errorElement = document.querySelector(".error-message") as HTMLElement;
function createUser(event) {
  event.preventDefault();
  try {
    const user = {
      userName: event.target.elements.userName.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    const form = document.querySelector(".signin-form") as HTMLFormElement;
    form.reset();
    fetch("/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.errorMessage);
      });
  } catch (error) {
    console.log(error);
  }
}

function back() {
  window.location.replace("../");
}
