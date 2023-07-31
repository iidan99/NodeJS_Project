"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usersControls_1 = require("./usersControls");
var router = express_1["default"].Router();
router.get("/").post("/sign-in", usersControls_1.createUser).patch("/get-user", usersControls_1.getUser);
exports["default"] = router;
