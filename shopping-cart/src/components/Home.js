import React from 'react'
import { CartState } from '../context/context'
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';
import Filters from './Filters';

function Home() {
    const {state} = CartState();
    console.log(state.products);
  return (
    <>
        <Container>
            <Row className='homeContainer'>
                <Col className='filtersContainer'>
                    <Filters/>
                </Col>
                <Col sm={9} className='productContainer'>
                    {
                        state.products.map((prod) => (
                            <Product prod={prod} key={prod.id}/>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Home
