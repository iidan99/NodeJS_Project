import express from "express";
import { createUser, getUser } from "./usersControls";

const router = express.Router();

router.get("/").post("/sign-in", createUser).patch("/get-user", getUser);

export default router;
