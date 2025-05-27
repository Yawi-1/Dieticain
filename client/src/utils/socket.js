import { io } from "socket.io-client";

const socket = io("https://dieticain.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
