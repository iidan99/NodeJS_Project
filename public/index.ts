const userLogin = JSON.parse(localStorage.getItem("user")!);
console.log(userLogin.date);
const newDate = new Date();
const lastLogin = userLogin.date;
if (userLogin) {
  console.log("its not empty");
  window.location.replace("./main/main.html");
}
function handleLogin(event) {
  event.preventDefault();

  fetch("/get-user", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: event.target.elements.userName.value,
      password: event.target.elements.password.value,
    }),
  })
    .then((res) => res.json())
    .then(({ user }) => {
      try {
        if (!user) throw new Error("There is no data");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user.userName,
            password: user.password,
            userID: user._id,
            date: new Date(),
          })
        );
        const userData = user;
        console.log(userData);
        window.location.replace("/main/main.html");
      } catch (error) {}
    });
}
