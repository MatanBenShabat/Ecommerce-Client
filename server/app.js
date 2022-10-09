const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("development");
  app.use(morgan("dev"));
}
else{
  console.log("production");
}

const usersRoutes = require("./routes/api-users");
const productsRoutes = require("./routes/api-products");
const handle404 = require("./middlewares/handle404");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Conected to database"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());

app.use("/api-users", usersRoutes);
app.use("/api-products", productsRoutes);

app.all("*", handle404);

app.use(globalErrorHandler);

module.exports = app;
