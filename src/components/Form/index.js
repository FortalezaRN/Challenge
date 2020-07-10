import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { Add } from '../index';
import { setPages, setCurrentPage } from '../../ducks/numbers';

const NumberFilter = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const {
    items: numbers,
  } = useSelector(state => state.numbers);

  const handleNameChange = (event) => {
    // dispatch(setFilterNumber(event.target.value)); //when the api came
    console.log("olha o numbers", numbers)
    dispatch(setPages(numbers.filter(val => val.value.includes(event.target.value))));
    dispatch(setCurrentPage(0));
  };

  const showModal = () => {
    setShow(true);
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8}>
        <Form>
          <Form.Group controlId="numberFilter">
            <Form.Label>Filter phone number:</Form.Label>
            <Form.Control onChange={handleNameChange} />
          </Form.Group>
        </Form>
      </Col>
      <Col xs={12} md={4} className="d-flex align-items-end">
        <Button
          variant="primary"
          className="d-flex justify-content-center align-items-center mb-3 w-100"
          onClick={showModal}
        >
          Add new number 
          <FaPlus color="#FFFFF" fontSize={16} className="ml-2" />
        </Button>
        { show && <Add show={show} closeModal={setShow} />}
      </Col>
    </Row>
  );
};

export default NumberFilter;