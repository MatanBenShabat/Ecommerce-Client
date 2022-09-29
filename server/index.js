const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
require('dotenv').config()
const bodyParser = require("body-parser");
mongoose.Promise = global.Promise;

const adminRoutes = require("./routes/api-users");
const buyerRoutes = require("./routes/api-buyer");
const productsRoutes = require("./routes/api-products");
const sellerRoutes = require("./routes/api-seller");
const sellerCartRoutes = require("./routes/api-sellerCart");
const LoginStatusRoutes = require("./routes/api-login-status");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("conected to database"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  next();
});
app.use(bodyParser.json());

app.use("/api-users", adminRoutes);
app.use("/api-buyer", buyerRoutes);
app.use("/api-products", productsRoutes);
app.use("/api-seller", sellerRoutes);
app.use("/api-sellerCart", sellerCartRoutes);
app.use("/api-login-status", LoginStatusRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json( {status: "error",
  messege: err.messege});
  next();
});
app.listen(port, () => {
  console.log("server is runing on port " + port);
});
