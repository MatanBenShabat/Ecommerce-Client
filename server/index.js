require("dotenv").config();
const app = require("./app");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Conected to database"))
  // .catch((err) => console.log(err));


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is runing on port ${port} in ${process.env.NODE_ENV}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("add_product", () => {
    socket.broadcast.emit("product_added");
  });
  socket.on("add_bid", () => {
    socket.broadcast.emit("product_added");
  });
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
 