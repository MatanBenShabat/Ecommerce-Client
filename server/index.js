require("dotenv").config();
const app = require("./app");
const {Server} = require('socket.io')

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

const io = new Server(server, {
  cors:{
    origin:'http://localhost:3000',
    methods: ["GET", "POST","PATCH","PUT","DELETE"],
  },
});

io.on('connection',(socket)=>{
  // console.log(socket.id)

  socket.on('add_product',()=>{
    socket.broadcast.emit('product_added')
  })
})