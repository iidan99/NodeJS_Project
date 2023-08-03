import express from "express";
import { createPost, getPosts } from "./postsControls";

const router = express.Router();

router.get("/").post("/create-post", createPost).get("/get-posts", getPosts);

export default router;
