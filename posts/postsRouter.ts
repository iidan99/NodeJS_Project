import express from "express";
import { createPost } from "./postsControls";

const router = express.Router();

router.get("/").post("/create-post", createPost);

export default router;
