const express = require("express");
const authController = require("../controllers/auth.controller");
const { getUser, updateUser } = require("../controllers/user.controller");
const canAccess = require("../middleware/auth.middleware");

const userRoutes = express.Router();

userRoutes.get("/me", getUser);

userRoutes.post("/me/update", updateUser);

module.exports = userRoutes;
