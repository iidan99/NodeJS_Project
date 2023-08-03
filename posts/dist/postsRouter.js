"use strict";
exports.__esModule = true;
var express_1 = require("express");
var postsControls_1 = require("./postsControls");
var router = express_1["default"].Router();
router.get("/").post("/create-post", postsControls_1.createPost).get("/get-posts", postsControls_1.getPosts);
exports["default"] = router;
