import React, { useEffect } from "react";
import useGetTodo from "../hooks/useGetTodo";
import useDoneTodo from "../hooks/useDoneTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import Todo from "./Todo";
import { useDispatch } from "react-redux";
import { get } from "../modules/todo";

const TodoList = () => {
  const todos = useGetTodo();
  const onDone = useDoneTodo();
  const onDel = useDeleteTodo();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get());
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
        {/*}
        {todos.map((todo, i) => {
          if (todo.text === "") {
            onDel(i);
          }
          return (
            <Todo
              key={todo.id}
              {...todo}
              handleDone={handleDone}
              handleDelete={handleDelete}
            />
			);
		})}
			{*/}
      </ul>
    </div>
  );
};
export default TodoList;
