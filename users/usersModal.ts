import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
const UserModal = mongoose.model("User", UserSchema);

export default UserModal;
