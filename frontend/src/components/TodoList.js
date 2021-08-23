import React from "react";
import useGetTodo from "../hooks/useGetTodo";
import useDoneTodo from "../hooks/useDoneTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import Todo from "./Todo";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUpdateTodo from "../hooks/useUpdateTodo";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.data);
  const onDone = useDoneTodo();
  const onDel = useDeleteTodo();
  const onUpdate = useUpdateTodo();

  useEffect(() => {
    console.log("changed");
  }, [todos]);

  const handleDone = (payload) => {
    onDone(payload);
  };
  const handleDelete = (payload) => {
    onDel(payload);
  };
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              {...todo}
              handleDone={handleDone}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default TodoList;
