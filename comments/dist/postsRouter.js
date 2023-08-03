"use strict";
exports.__esModule = true;
var express_1 = require("express");
var commentsControls_1 = require("./commentsControls");
var router = express_1["default"].Router();
router.get("/").post("/create-post", commentsControls_1.createPost).get("/get-posts", commentsControls_1.getPosts);
exports["default"] = router;
