"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    userName: String,
    date: { type: Date, "default": Date.now },
    description: String,
    user_ID: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: "User" },
    post_ID: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: "Post" }
});
var CommentModal = mongoose_1["default"].model("Comment", CommentSchema);
exports["default"] = CommentModal;
