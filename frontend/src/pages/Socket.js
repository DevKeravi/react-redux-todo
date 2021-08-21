import React, { useState } from "react";
import { io } from "socket.io-client";

function SocketTest() {
  const [text, setText] = useState("Initial State");
  const socketClient = io("http://localhost:5000/");
  const handleConnect = (e) => {
    e.preventDefault();
    socketClient.on("connect", () => {
      setText("Connected");
    });
  };
  return (
    <div>
      <h2>Socket Test Page</h2>
      <div>{text}</div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}
export default SocketTest;
