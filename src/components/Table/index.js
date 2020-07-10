import React, { useEffect, useState } from 'react';
import { Table as BootTable, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaTrash, FaPen } from 'react-icons/fa';

import { ModalInfo } from '../index';
import { retrieveNumbers, deleteNumber } from '../../ducks/numbers';

import './Table.css';

const Table = () => {
  const dispatch = useDispatch();

  const {
    currentPage,
    pages
  } = useSelector(state => state.numbers);

  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    dispatch(retrieveNumbers());
  }, [dispatch]);

  function openModaInfo(numberInfo) {
    setDataModal(numberInfo);
    setShow(true)
  }

  function removeNumber(id) {
    dispatch(deleteNumber(id));
  }

  return(
    <Row className="justify-content-md-center">
      <Col className="table-numbers">
        <BootTable striped bordered className="text-center">
          <thead>
            <tr>
              <th>Number</th>
              <th>Monthly price</th>
              <th>Setup price</th>
              <th>Currency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { pages.length > 0 &&
              pages[currentPage].map(number =>{ 
                console.log(number)
                return(
                <tr key={number.id}>
                  <td>{number.value}</td>
                  <td>{number.monthyPrice}</td>
                  <td>{number.setupPrice}</td>
                  <td>{number.currency}</td>
                  <td className="td-btn-infos">
                    <Button onClick={() => openModaInfo(number)} className="mr-1">
                      <div className="d-flex align-items-center">
                        <FaEye size={16} color="#FFF" aria-label="View Infos"/>
                      </div>
                    </Button>
                    <Button variant="danger" onClick={() => removeNumber(number.id)} className="mr-1">
                      <div className="d-flex align-items-center">
                        <FaTrash size={16} color="#FFF" aria-label="Delete number"/>
                      </div>
                    </Button>
                    {/* <Button variant="success" onClick={() => {}}>
                      <div className="d-flex align-items-center">
                        <FaPen size={16} color="#FFF" aria-label="View Infos"/>
                      </div>
                    </Button> */}
                  </td>
                </tr>
              )})
            }
          </tbody>
        </BootTable>
      </Col>
      { show && 
        <ModalInfo show={show} closeModal={setShow} data={dataModal} />
      }
    </Row>
  )
}

export default Table;