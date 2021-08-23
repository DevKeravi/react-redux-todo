export default function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket("ws://localhost:5000/ws");

    socket.onopen = function () {
      resolve(socket);
    };
    socket.onerror = function (e) {
      reject(e);
    };
  });
}
