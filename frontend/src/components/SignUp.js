import React, { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";

import { callGenerateVerification } from "../calls";

const SignUp = (props) => {
  const [zID, setZID] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    callGenerateVerification(zID, fullName, password).catch((error) => {
      alert(error.response.data.message);
    });
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>zID</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="z1234567"
            aria-label="zID"
            onChange={(event) => {
              setZID(event.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Full Name</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Jashank Shepherd"
            aria-label="full name"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </InputGroup>
        <p>Your password must be at least 8 characters long.</p>
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <FormControl
            type="password"
            placeholder="*******"
            aria-label="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </InputGroup>
        <p>
          An email will be sent to {zID}@unsw.edu.au to verify your account.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="mx-2" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          className="mx-2"
          onClick={handleSignUp}
          disabled={
            zID.length !== 8 || fullName.length === 0 || password.length < 8
          }
        >
          Signup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUp;
