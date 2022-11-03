import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_URL}`);
// const socket = io.connect("http://localhost:5000");

export default socket
