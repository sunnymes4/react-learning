import React, { useCallback, useEffect, useState } from 'react'
import { ListGroup, Button, Row, Container, Col, Image, Form } from 'react-bootstrap'

import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/context'
import Ratings from './Ratings'

function Cart() {
  const {state, dispatch} = CartState();
  const [total, setTotal] = useState();
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);

  useEffect(() => {
    setTotal(state.cart.reduce((acc, prod) => acc+Number(prod.price)*prod.qty, 0));

    if(total > 1000) {
      setDiscount(Math.round(total/10));
      setShippingFee(50)
      setPlatformFee(20)
    } else {
      setDiscount(0);
      setPlatformFee(0);
      setShippingFee(0);
    }

  }, [state.cart, total])
  return (
    <>
    <Container className='homeContainer'>
      {
        state.cart.length === 0 ? (
          <div className='emptyCart'>
            <h1>There are no items in the Cart</h1>
          </div>
          
        ) : (
          <Row>
          <Col className='cartList' sm={9}>
            <ListGroup as="ol">
              {
                state.cart.map(prod => (
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
                ))
              }
            </ListGroup>
          </Col>
          <Col sm={3}>
            <div className="summary">
              <span className="title">PRICE DETAILS ({state.cart.length} Items)</span>

              <p>Total MRP: <span>₹{total}</span></p>
              <p className='discount'>
                Discount on MRP:
                {
                  discount > 0 ? (
                    <span>
                      - ₹{discount}
                    </span>
                ) : (
                  <span>0</span>
                )
                }
              </p>
              <p>Platform Fee: <span>{platformFee ? (<span>₹{platformFee}</span>) : (<span>0</span>)}</span></p>
              <p className='shipping'>
                Shipping Fee: 
                {shippingFee ? (<span>₹{shippingFee}</span>) : (<span>FREE</span>)}
              </p>

              <p className='totalAmountPayable'>
                Total Amount
                <span>
                  ₹{(total-discount) + (shippingFee+platformFee)}
                </span>
              </p>
              <Button variant='danger' type="button" disabled={state.cart.length === 0}>
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
        
        )
      }

    </Container>
      
    </>
  )
}

export default Cart
