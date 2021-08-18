import React, { useState } from "react";
import useAddTodo from "../hooks/useAddTodo";
import useGetTodo from "../hooks/useGetTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";

const TodoInput = () => {
  const [value, setValue] = useState("");
  const onAdd = useAddTodo();
  const data = useGetTodo();
  const onUpdate = useUpdateTodo();
  const { isLoading, error } = data;

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onClickUpdate = (event) => {
    event.preventDefault();
    onUpdate();
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    const payload = value;
    onAdd(payload);
    onUpdate();
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
      <button onClick={onClickUpdate}>Update</button>
      {isLoading && !error ? <h1>Fetching...</h1> : <h1>Input Status OK!</h1>}
    </div>
  );
};

export default TodoInput;
