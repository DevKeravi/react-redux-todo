import React, { useState } from "react";
import useAddTodo from "../hooks/useAddTodo";
import useGetTodo from "../hooks/useGetTodo";

const TodoInput = () => {
  const [value, setValue] = useState("");
  const onAdd = useAddTodo();
  const data = useGetTodo();
  const { isLoading, error } = data;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    const payload = value;
    onAdd(payload);
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
      {isLoading && !error ? <h1>Fetching...</h1> : <h1>Status OK!</h1>}
    </div>
  );
};

export default TodoInput;
