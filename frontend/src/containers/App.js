import React from "react";
import { Route } from "react-router";
import Menu from "../components/Menu";
import { Home, TodoPage, Profile, Socket } from "../pages";
function App() {
  return (
    <div className="App">
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/todo" component={TodoPage} />
      <Route path="/profile" component={Profile} />
      <Route path="/socket" component={Socket} />
    </div>
  );
}

export default App;
