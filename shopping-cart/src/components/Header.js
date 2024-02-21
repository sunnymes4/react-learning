import React from 'react'
import {
    Navbar,
    Container,
    FormControl,
    Nav,
    Dropdown,
    Badge
} from 'react-bootstrap'
import { LuShoppingCart } from "react-icons/lu";
import {Link} from 'react-router-dom'
import "./styles.css";
import { CartState } from '../context/context';
import { TiDelete } from "react-icons/ti";


function Header() {
    const {state, dispatch} = CartState(); 

    return (
        <div className='topbar'>
        <Navbar bg='dark' varient='dark' style={{height: 80}}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>
                        Brand link
                    </Link>
                </Navbar.Brand>
                <Navbar.Text>
                    <FormControl
                        style={{width: 500}}
                        className='m-auto'
                        placeholder='Search a Product'
                    >
                    </FormControl>
                </Navbar.Text>
                <Nav>
                    <Dropdown >
                        <Dropdown.Toggle varient='warning'>
                            <LuShoppingCart/>
                            <Badge>{state.cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{color: 'black !important'}}>
                            {
                                state.cart.length > 0 ? (
                                    state.cart.map(item => (
                                        <Dropdown.Item key={item.id}>
                                            <img src={item.image} alt={item.name}/>  
                                            <p>
                                                <span>{item.name}</span>
                                                <span>{item.price}</span>
                                            </p>
                                            <button onClick={() =>
                                                dispatch({
                                                    type: 'REMOVE_FROM_CART',
                                                    payload: item
                                                })}>
                                                <TiDelete className='deleteIcon'/>
                                            </button>
                                        </Dropdown.Item>
                                    ))
                                    
                                ) : (
                                    <span style={{padding: '10px'}}>Cart is Empty</span>
                                )
                            }
                            {
                                state.cart.length > 0 ? (
                                    <button
                                        type="button"
                                        className="btn-sm btn btn-primary cartBtn"
                                        
                                        >
                                            <Link to="/cart">Go To Cart</Link>
                                    </button>
                                ) : null
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default Header
