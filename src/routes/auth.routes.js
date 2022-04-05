const controller = require("../controllers/auth.controller");
const express = require("express");

const authRoutes = express.Router();

authRoutes.post("/register", controller.registerUser);

authRoutes.post("/login", controller.login);

module.exports = authRoutes;
