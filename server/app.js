const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


const usersRoutes = require("./routes/api-users");
const productsRoutes = require("./routes/api-products");
const handle404 = require("./middlewares/handle404");


app.use(cors());

app.use(express.json());

app.use("/api-users", usersRoutes);
app.use("/api-products", productsRoutes);

app.all("*", handle404);

app.use(globalErrorHandler);

module.exports = app;
