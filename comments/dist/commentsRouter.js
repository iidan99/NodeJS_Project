"use strict";
exports.__esModule = true;
var express_1 = require("express");
var commentsControls_1 = require("./commentsControls");
var router = express_1["default"].Router();
router
    .get("/")
    .post("/create-comment", commentsControls_1.createComment)
    .patch("/get-comments", commentsControls_1.getComments)["delete"]("/delete-comment", commentsControls_1.deleteComment);
exports["default"] = router;
