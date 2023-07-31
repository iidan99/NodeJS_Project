import mongoose, { Schema } from "mongoose";
import UserModal from "../users/usersModal";

const PostSchema = new Schema({
  userName: String,
  date: { type: Date, default: Date.now },
  description: String,
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PostModal = mongoose.model("Post", PostSchema);

export default PostModal;
