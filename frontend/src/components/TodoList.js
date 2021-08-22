import React, { useEffect } from "react";
import useGetTodo from "../hooks/useGetTodo";
import useDoneTodo from "../hooks/useDoneTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import Todo from "./Todo";
import useUpdateTodo from "../hooks/useUpdateTodo";

const TodoList = () => {
  const todos = useGetTodo();
  const onDone = useDoneTodo();
  const onDel = useDeleteTodo();
  const onUpdate = useUpdateTodo();
  useEffect(() => {
    setInterval(() => {
      onUpdate();
      console.log("updated");
    }, 3000);
    return () => {
      clearInterval(0);
    };
  }, []);

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
