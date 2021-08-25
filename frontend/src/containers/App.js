import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";
import Menu from "../components/Menu";
import { Home, TodoPage, Profile, Socket } from "../pages";
function App() {
  const [dashSize, setDashSize] = useState(3);
  return (
    <div className="App">
      <Container fluid={true}>
        <Row>
          <Col sm={3} className="border mt-3">
            <Menu />
          </Col>
          <Col sm={7}>
            <Container className="border mt-3">
              <Route exact path="/" component={Home} />
              <Route path="/todo" component={TodoPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/socket" component={Socket} />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
