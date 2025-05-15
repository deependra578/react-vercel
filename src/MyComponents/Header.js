import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({onLogout, isLoggedIn}) {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/About">About</Nav.Link>
          </Nav>
          <div className="d-flex">
            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}