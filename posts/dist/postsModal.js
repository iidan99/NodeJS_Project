"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    userName: String,
    date: { type: Date, "default": Date.now },
    description: String,
    user_ID: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: "User" }
});
var PostModal = mongoose_1["default"].model("Post", PostSchema);
exports["default"] = PostModal;
