import React, { useEffect } from 'react';
import { Table as BootTable, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveNumbers } from '../../ducks/PhonesSlices';

import './Table.css';

const Table = () => {
  const dispatch = useDispatch();

  const {
    items: numbers,
  } = useSelector(state => state.numbers);

  const numbersList = useSelector(state => state.filtering);
  
  useEffect(() => {
    dispatch(retrieveNumbers());
  }, [dispatch]);

  const filteredNumbers = numbers.filter(val => val.value.includes(numbersList.number));

  return(
    <Row className="justify-content-md-center">
      <Col className="table-phone">
        <BootTable striped bordered hover>
          <thead>
            <tr>
              <th>Número</th>
              <th>Preço por Mês</th>
              <th>Preço Instalação</th>
              <th>Moeda</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredNumbers.map(number => (
                <tr key={number.id}>
                  <td>{number.value}</td>
                  <td>{number.monthyPrice}</td>
                  <td>{number.setupPrice}</td>
                  <td>{number.currency}</td>
                </tr>
              ))
            }
          </tbody>
        </BootTable>
      </Col>
    </Row>
  )
}

export default Table;