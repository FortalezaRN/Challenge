import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalInfo = ({show, closeModal,  data}) => {

  function handleClose(){
    closeModal(false);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Info Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Number:</strong> {data.value} </p>
        <p><strong>Monthly price:</strong> {data.monthyPrice} </p>
        <p><strong>Setup price:</strong> {data.setupPrice} </p>
        <p><strong>Currency:</strong> {data.currency} </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;