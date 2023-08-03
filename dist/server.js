"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var usersRouter_1 = require("./users/usersRouter");
var postsRouter_1 = require("./posts/postsRouter");
var commentsRouter_1 = require("./comments/commentsRouter");
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
// app.use("/sign-in", usersRoute);
// app.use("/get-user", usersRoute);
app.use("/", postsRouter_1["default"]);
// app.use("/create-post", postRoute);
// app.use("/get-comments", postRoute);
app.use("/", commentsRouter_1["default"]);
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
