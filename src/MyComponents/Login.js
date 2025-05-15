import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export default function Login({ onLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    try{
        // Call the onLogin function with email and password
        await onLogin(email, password);

        // Redirect to the home page after login
        navigate("/");
    }
    catch (error) {
        // Check if the error is a 401 status code
        if (error.response && error.response.status === 401) {
            setErrorMessage("Invalid email or password. Please try again.");
        } else {
            setErrorMessage("An unexpected error occurred. Please try again later.");
        }
    }
    


  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}