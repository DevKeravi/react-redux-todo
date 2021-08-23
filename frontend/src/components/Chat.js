import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONNECT_SOCKET } from "../modules/chat";
import Message from "./Message";

const Chat = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.chat.socket);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    dispatch(CONNECT_SOCKET());
  }, []);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      type: "added",
      payload: text,
    };
    socket.send(JSON.stringify(data));

    setText("");
  };
  return (
    <div className="ChatContainer">
      <div className="ChatInputContainer">
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={text}
            type="text"
            placeholder="Write your chat"
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div className="ChatListContainer">
        <ul className="ChatList">
          {messages.map((message) => (
            <Message key={message.id} text={message.text} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
