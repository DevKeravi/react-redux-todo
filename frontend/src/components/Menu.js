import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "1.5rem",
  };
  return (
    <div>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} exact to="/todo">
            Todo
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} exact to="/profile">
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
