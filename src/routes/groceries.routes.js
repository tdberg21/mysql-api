const controllers = require("../controllers/groceries.controller");
const express = require("express");

const groceriesRoutes = express.Router();

groceriesRoutes
  .get("/", controllers.getAllGroceries)
  .post("/", controllers.createGrocery);

groceriesRoutes
  .get("/:groceryId", controllers.getGrocery)
  .put("/:groceryId", controllers.updateGrocery)
  .delete("/:groceryId", controllers.deleteGrocery);

module.exports = groceriesRoutes;
