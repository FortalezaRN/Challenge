import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { addNewNumber } from '../../ducks/numbers';

const Add = ({show, closeModal}) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    value: "",
    monthyPrice: "",
    setupPrice: "",
    currency: ""
  });


  const handleNameChange = (event) => {
    setFormData({
      ...formData, [event.target.id]: event.target.value
    })
  };

  function handleClose(){
    closeModal(false);
  }

  function handleSave(){
    dispatch(addNewNumber(formData));
    closeModal(false);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group controlId="value">
          <Form.Label>Enter the new number</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            value={formData.value}
          />
        </Form.Group>
        <Form.Group controlId="monthyPrice">
          <Form.Label>Enter monthly price</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            value={formData.monthyPrice}
          />
        </Form.Group>
        <Form.Group controlId="setupPrice">
          <Form.Label>Enter setup price</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            value={formData.setupPrice}
          />
        </Form.Group>
        <Form.Group controlId="currency">
          <Form.Label>Enter currency</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            value={formData.currency}
          />
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;