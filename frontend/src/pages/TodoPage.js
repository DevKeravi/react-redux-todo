import React, { useEffect } from "react";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
function TodoPage() {
  return (
    <div className="TodoPage">
      <h1>React Redux Todo Web</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default TodoPage;
