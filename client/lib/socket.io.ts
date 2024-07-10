import { io } from "socket.io-client";
import { API_BASE_URL } from "./url";

export const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"],
});
