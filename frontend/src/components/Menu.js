import React from "react";
import { ListGroup, Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Menu = () => {
  return (
    <Nav className="flex-column p-2 vh-100">
      <Nav.Item>
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/todo">
          <Nav.Link>Todo</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/socket">
          <Nav.Link>Chat</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default Menu;
/*
  return (
    <>
      <Nav
        className="col-md12 d-none d-md-block bg-light sidebar"
        activekey="/"
      >
        <div claaName="sidebar-sticky"></div>
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/todo">
          <Nav.Link>Todo</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/socket">
          <Nav.Link>Chat</Nav.Link>
        </LinkContainer>
      </Nav>
    </>
  );
*/
