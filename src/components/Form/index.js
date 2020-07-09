import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { setNumber } from '../../ducks/FilteringSlice';

const NumberFilter = () => {
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    dispatch(setNumber(event.target.value));
  };

  return (
    <Form>
      <Form.Group controlId="numberFilter">
        <Form.Label>Filtro por nome:</Form.Label>
        <Form.Control onChange={handleNameChange} />
      </Form.Group>
    </Form>
  );
};

export default NumberFilter;