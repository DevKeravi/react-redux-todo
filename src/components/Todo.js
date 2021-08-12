import React from "react";
import "./Todo.css";

const Todo = ({ text, date, id, isdone, handleDone, handleDelete }) => {
  const doneText = !isdone ? "Done" : "Not Done";
  const doneMark = isdone ? "✅" : "❎";

  const onClickDone = (index) => {
    handleDone(index);
  };
  const onClickDelete = (index) => {
    handleDelete(index);
  };

  return (
    <li id={id} className="todoObject">
      <div>
        <div>
          <span>TODO : {text}</span>
          <span>{doneMark}</span>
        </div>
        <div>PostTime : {new Date(date).toString()}</div>
        <button onClick={onClickDone}>{doneText}</button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </li>
  );
};

export default Todo;
