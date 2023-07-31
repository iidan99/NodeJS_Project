"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
var UserModal = mongoose_1["default"].model("User", exports.UserSchema);
exports["default"] = UserModal;
