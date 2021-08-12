import React, { useState } from "react";
import { Map } from "immutable";
import useAddTodo from "../hooks/useAddTodo";

const TodoInput = () => {
  const [value, setValue] = useState("");
  const onAdd = useAddTodo();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    const text = value;
    const todo = Map({
      text: text,
      date: Date.now(),
      id: Date.now(), // todo
      isdone: false,
    });
    onAdd(todo);

    setValue("");
  };

  return (
    <div>
      <input
        onChange={onChange}
        type="text"
        placeholder="Write your todo"
        value={value}
      />
      <button onClick={onClickSubmit}>Submit</button>
    </div>
  );
};

export default TodoInput;
