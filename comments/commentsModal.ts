import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  userName: String,
  date: { type: Date, default: Date.now },
  description: String,
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const CommentModal = mongoose.model("Comment", CommentSchema);

export default CommentModal;
