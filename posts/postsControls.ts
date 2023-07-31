import PostModal from "./postsModal";
import UserModal from "./postsModal";

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

export const createPost = async (req: any, res: any) => {
  try {
    const { userName, description, user_ID } = req.body;
    const post = await PostModal.create({
      userName,
      description,
      user_ID,
    });
    const postsList = await PostModal.find({});
    res.send({ send: "ok", post: postsList });
  } catch (error) {
    console.log(error);
    res.status(500).send("did not get any data");
  }
};
