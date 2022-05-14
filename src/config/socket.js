import io from "socket.io-client";

const socket = io.connect("https://wa-gateway-api-2.herokuapp.com");

export default socket;