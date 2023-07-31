import UserModal from "./usersModal";

export const getUser = async (req: any, res: any) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModal.findOne({
      userName: userName,
      password: password,
    });
    console.log(user);

    res.send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;
    const existsUser = await UserModal.findOne({ email: email });
    console.log(existsUser);
    if (!existsUser) {
      const user = await UserModal.create({
        userName,
        firstName,
        lastName,
        email,
        password,
      });
      const thisUser = await UserModal.findOne({ email: email });
      res.send({ send: "ok", users: thisUser });
    } else {
      res.send({ send: "ok", errorMessage: "This user is already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get any data");
  }
};
