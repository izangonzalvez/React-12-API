import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const { authToken } = useContext(UserContext);

  return (
    <Container fluid className="footer-container bg">
      <Row>
        <Col className="bg text-center">
          <p>Segueix-nos a xarxes!</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Nav className="justify-content-center">
            <Nav.Item>
              <Nav.Link href="https://twitter.com" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://facebook.com" target="_blank">
                <FontAwesomeIcon icon={faFacebook} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com" target="_blank">
                <FontAwesomeIcon icon={faGithub} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://linkedin.com" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <hr />
    </Container>
  );
}
