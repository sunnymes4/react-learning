import {React} from 'react'
import { Card, Button, Stack } from 'react-bootstrap';
import Ratings from './Ratings';
import { CartState } from '../context/context';

function Product({prod}) {

    const {state, dispatch} = CartState();
    return (
    <>
        <Card className='products'>
            <Card.Img variant="top" src={prod.image} />
            <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <Card.Text>
                    Rs. {prod.price}
                </Card.Text>
                <Card.Text>
                    {prod.fastDelivery ? 'Fast Delivery' : '4 Days Delivery'}
                </Card.Text>
                <span>
                    <Ratings rating={prod.ratings} onClick={(i) => console.log(i)}/>
                </span>
                <Stack direction="horizontal" gap={2}>
                    {
                        state.cart.some((item) => item.id === prod.id) ? (
                            <Button variant="danger" className='btn-sm mb-10'
                                onClick={() => dispatch({
                                    type: 'REMOVE_FROM_CART',
                                    payload: prod
                                })}
                                >Remove from Cart</Button>
                        ) : (
                            <Button
                                variant="primary" 
                                className='btn-sm' 
                                disabled={!prod.inStock}
                                onClick={() => dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: prod
                                })}
                                >{prod.inStock ? 'Add to Cart' : 'Not In Stock'}
                            </Button>
                        )
                    }
                </Stack>
                
            </Card.Body>
        </Card>
    </>
    )
}

export default Product
