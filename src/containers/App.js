import React from "react";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
function App() {
  return (
    <div className="App">
      <h1>React Redux Todo Web</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
