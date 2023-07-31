"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var usersRouter_1 = require("./users/usersRouter");
var postsRouter_1 = require("./posts/postsRouter");
dotenv.config();
var uri = process.env.MONGOOSE_URI + "posts";
var app = express_1["default"]();
app.use(express_1["default"].json());
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () {
        console.log("DB connected");
    })["catch"](function (error) {
        console.log(error);
    });
}
else {
    console.log("No URI to DB");
}
app.use(express_1["default"].static("./public"));
app.use("/", usersRouter_1["default"]);
app.use("/sign-in", usersRouter_1["default"]);
app.use("/get-user", usersRouter_1["default"]);
app.use("/", postsRouter_1["default"]);
app.use("/create-post", postsRouter_1["default"]);
app.use("/get-comments", postsRouter_1["default"]);
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
