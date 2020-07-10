import React, { useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { setAddSucess, setRemoveSucess, setEditSucess } from '../../ducks/numbers';
import { Form, Table, Loading, Pagination } from '../../components';

import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isAddSucess,
    isEditSucess,
    isRemoveSucess
  } = useSelector(state => state.numbers);

  useEffect(() => {
    setTimeout(() => dispatch(setAddSucess()), 2000);
  }, [dispatch, isAddSucess]);

  useEffect(() => {
    setTimeout(() => dispatch(setRemoveSucess()), 2000);
  }, [dispatch, isRemoveSucess]);

  useEffect(() => {
    setTimeout(() => dispatch(setEditSucess()), 2000);
  }, [dispatch, isEditSucess]);
 
  return(
    <div className="App">
      <Row>
        <Col>
          <Container as="header">
            <h1>Get Your Number</h1>
          </Container>
        </Col>
      </Row>
      <Container as="main">
        <Form />
        <Table />
        <Pagination />
      </Container>
      { isLoading && <Loading />}
      { isAddSucess && 
        <Alert className="alert-sucess-add" variant="success">
          New number successfully registered
        </Alert>
      }
      { isRemoveSucess && 
        <Alert className="alert-sucess-add" variant="success">
          Number was deleted
        </Alert>
      }
      { isEditSucess && 
        <Alert className="alert-sucess-add" variant="success">
          Number was Edited
        </Alert>
      }
    </div>
  );
}

export default Home;