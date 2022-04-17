const { getAllGroceries, createGrocery, getGrocery, updateGrocery, deleteGrocery } = require("../controllers/groceries.controller");
const express = require("express");
const canAccess = require("../middleware/auth.middleware");

const groceriesRoutes = express.Router();

groceriesRoutes
  .get("/", canAccess, getAllGroceries).post("/", canAccess, createGrocery);

groceriesRoutes
  .get("/:groceryId", canAccess, getGrocery)
  .put("/:groceryId", canAccess, updateGrocery)
  .delete("/:groceryId", canAccess, deleteGrocery);

module.exports = groceriesRoutes;
