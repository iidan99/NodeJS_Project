import express from "express";
import { createComment, getComments, deleteComment } from "./commentsControls";

const router = express.Router();

router
  .get("/")
  .post("/create-comment", createComment)
  .patch("/get-comments", getComments)
  .delete("/delete-comment", deleteComment);

export default router;
