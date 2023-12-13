
import Socket from "socket.io-client";
const socket = Socket.connect('http://localhost:5000')


export default function useConnectSocket() {
  return socket;
}
