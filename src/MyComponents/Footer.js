import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-3">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">© 2025 Todo App. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">Created by Deependra Singh</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}