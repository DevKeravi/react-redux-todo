import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col md={3}>a side</Col>
        <Col md={9}>b side</Col>
      </Row>
    </Container>
  );
};
export default App;
