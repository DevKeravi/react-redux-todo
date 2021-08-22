import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function SocketTest() {
  const [text, setText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const url = "ws://localhost:5000/ws";
  let ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(url);
      ws.current.onopen = () => {
        console.log("connected to" + url);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnected from " + url);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error" + url);
        console.log(error);
      };
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log("onmessage");
        console.log(data);
      };
    }
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          message: "connected",
        })
      );
    }
  }, [socketConnected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ws.current.send(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div>
      <h2>Socket Test Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="testing input"
          value={text}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
export default SocketTest;
