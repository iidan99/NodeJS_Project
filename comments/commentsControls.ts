import CommentModal from "./commentsModal";
import PostModal from "../posts/postsModal";
import UserModal from "../users/usersModal";

export const getComments = async (req: any, res: any) => {
  try {
    const { postID } = req.body;
    const commentsList = await CommentModal.find({ post_ID: postID }).sort({
      date: -1,
    });
    res.status(200).send({ status: "200", commentsList: commentsList });
  } catch (error) {
    console.log(error);
    res.status(500).send("There is no Data ");
  }
};

export const createComment = async (req: any, res: any) => {
  try {
    const { description, postID, userID } = req.body;
    console.log(description);

    if (!description) throw new Error("There is no content");
    if (!postID) throw new Error("There is no PostId");
    const post = await PostModal.findById(postID);
    if (!post) throw new Error("There is no post");

    console.log(post);

    const user = await UserModal.findById(userID);
    console.log(user);

    if (!user) throw new Error("There is no user");

    const comment = await CommentModal.create({
      userName: user.userName,
      post_ID: post._id,
      user_ID: user._id,
      description: description,
    });

    const commentList = await CommentModal.find({ post_ID: postID }).lean();
    res.status(200).send({ send: "od", commentList });
  } catch (error) {
    console.log(error);
    res.status(500).send("There is no data");
  }
};

export const deleteComment = async (req: any, res: any) => {
  try {
    const { commentID } = req.body;
    if (!commentID) throw new Error("There is no Comment ID");

    const commentDB = await CommentModal.findByIdAndDelete(commentID);

    res.status(200).send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "There is no data" });
  }
};
