import React, { useEffect, useState } from 'react'
import { ListGroup, Button, Row, Container, Col, Image, Form } from 'react-bootstrap'

import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/context'
import Ratings from './Ratings'

function Cart() {
  const {state, dispatch} = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(state.cart.reduce((acc, prod) => acc+Number(prod.price)*prod.qty, 0))
  }, [state.cart])
  return (
    <>
    <Container className='homeContainer'>
      <Row>
        <Col className='cartList' sm={9}>
          <ListGroup as="ol" numbered>
            {
              state.cart.map(prod => (
                <>
                  
                  <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>₹ {prod.price}</Col>
                    <Col md={2}>
                      <Ratings rating={prod.ratings} />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={prod.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: prod.id,
                              qty: e.target.value,
                            },
                          })
                        }
                      >
                        {[...Array(prod.inStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                </>
              ))
            }
          </ListGroup>
        </Col>
        <Col sm={3}>
          <div className="filters summary">
            <span className="title">Subtotal ({state.cart.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
            <Button type="button" disabled={state.cart.length === 0}>
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
      
    </Container>
      
    </>
  )
}

export default Cart
