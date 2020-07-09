import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import chunk from 'lodash.chunk';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveNumbers } from '../../ducks/PhonesSlices';

import { Form, Table, Loading } from '../../components'

const Home = () => {

  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    items: numbers,
  } = useSelector(state => state.numbers);

  const numbersList = useSelector(state => state.filtering);
  // const [selectedNumberId, setSelectedNumberId] = React.useState(null);
  
  useEffect(() => {
    dispatch(retrieveNumbers());
  }, [dispatch]);

 
  return(
    <div className="App">
      <Row>
        <Col>
          <Container as="header">
            <h1>Seu número</h1>
          </Container>
        </Col>
      </Row>
      <Container as="main">
          <Row className="justify-content-md-center">
            <Col>
              <Form />
            </Col>
          </Row>
          <Table />
      </Container>
      { isLoading && <Loading />}
    </div>
  );
}

export default Home;