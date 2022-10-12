const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const globalErrorHandler = require("./controllers/errorController");
const usersRoutes = require("./routes/api-users");
const productsRoutes = require("./routes/api-products");
const handle404 = require("./middlewares/handle404");
const cors = require("cors");

const app = express();


// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max:100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour."
})
app.use(limiter)

// Body parser, reading data from body into req.body
app.use(express.json({limit: "10kb"}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'brand',
      'rating',
      'currentBid',
      'createDate',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`))


// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
    // console.log(req.headers);
  next()
})

app.use(cors());

// 2) ROUTES

app.use("/api-users", usersRoutes);
app.use("/api-products", productsRoutes);

app.all("*", handle404);

app.use(globalErrorHandler);

module.exports = app;
