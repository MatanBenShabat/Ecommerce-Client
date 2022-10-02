const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
// mongoose.Promise = global.Promise;

const app = express();

const usersRoutes = require("./routes/api-users");
const productsRoutes = require("./routes/api-products");

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("conected to database"))
  .catch((err) => console.log(err));

  app.use(cors());

// app.use(bodyParser.json());
app.use(express.json());

app.use("/api-users", usersRoutes);
app.use("/api-products", productsRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json( {status: "error",
  messege: err.messege});
  next();
});

module.exports = app