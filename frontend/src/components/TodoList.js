import React from "react";
import useDoneTodo from "../hooks/useDoneTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import Todo from "./Todo";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.data);
  const onDone = useDoneTodo();
  const onDel = useDeleteTodo();

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
