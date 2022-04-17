const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const groceriesRoutes = require("./routes/groceries.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const { error404, error500 } = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";
const env = process.env.NODE_ENV;

if (env !== "test") {
  app.use(logger(logLevel));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/groceries", groceriesRoutes);

app.use(error404);
app.use(error500);

app.listen(port, () => {
  console.log(`Server is running on port:${port}!`);
});
