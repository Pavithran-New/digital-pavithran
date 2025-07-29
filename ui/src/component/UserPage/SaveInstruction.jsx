import React, { useState } from "react";
import { Header } from "../header_footer/header";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Form,
} from "react-bootstrap";

function SaveInstruction() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [info, setInfo] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !selectedType) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = {
      name,
      address,
      info,
      type: selectedType,
    };

    user.address = address;
    user.name = name;
    user.contactType = selectedType;
    user.additionalInfo = info;

    localStorage.setItem("user", JSON.stringify(user));
    navigate(-1); // Go back
  };

  return (
    <>
      <Header label="" />

      <section className="container mt-4">
        <h4 className="mb-3">Add Delivery Instructions</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Name</strong></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Address</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Complete address including street and city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Label><strong>Address Type</strong></Form.Label>
          <ButtonGroup className="mb-3 d-flex flex-wrap">
            {["House", "Apartment", "Business", "Other"].map((type) => (
              <Button
                key={type}
                variant="outline-secondary"
                onClick={() => setSelectedType(type)}
                active={selectedType === type}
              >
                {type}
              </Button>
            ))}
          </ButtonGroup>

          <p className="text-muted">
            E.g. Independent house, villa, or builder floor (6AM-11 PM delivery)
          </p>

          <Card className="mb-3">
            <Card.Header><strong>Additional Delivery Instructions</strong></Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g. Leave at the front gate, ring bell once"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </Card.Body>
          </Card>

          {error && <p className="text-danger text-center">{error}</p>}

          <Button type="submit" className="w-100">Save Instruction</Button>
        </Form>
      </section>
    </>
  );
}

export default SaveInstruction;
