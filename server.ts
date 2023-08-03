import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import usersRoute from "./users/usersRouter";
import postRoute from "./posts/postsRouter";
import commentRoute from "./comments/commentsRouter";
import UserModal from "./users/usersModal";

dotenv.config();
const uri: string | undefined = process.env.MONGOOSE_URI + "posts";
const app = express();
app.use(express.json());

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log("No URI to DB");
}
app.use(express.static("./public"));

app.use("/", usersRoute);
// app.use("/sign-in", usersRoute);
// app.use("/get-user", usersRoute);
app.use("/", postRoute);
// app.use("/create-post", postRoute);
// app.use("/get-comments", postRoute);
app.use("/", commentRoute);

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
