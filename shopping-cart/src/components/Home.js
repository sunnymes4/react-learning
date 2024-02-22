import React from 'react'
import { CartState } from '../context/context'
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';
import Filters from './Filters';

function Home() {
    const {
            state: {products},
            filterProdState: {sortByPrice, byStock, byFastDelivery, byRating, searchQuery}
        } = CartState();
    
    const transformProducts = () => {
        let sortedProducts = products;
        if(sortByPrice) {
            sortedProducts.sort((a,b) => sortByPrice === 'highToLow' ? b.price-a.price : a.price - b.price )
        }

        if(!byStock) {
            sortedProducts = sortedProducts.filter((item) => item.inStock)
        }

        if(byFastDelivery) {
            sortedProducts = sortedProducts.filter((item) => item.fastDelivery)
        }

        if(byRating > 0) {
            sortedProducts = sortedProducts.filter((item) => item.ratings >= byRating)
        }

        if(searchQuery) {
            sortedProducts = sortedProducts.filter((item) => item.name.toLowerCase().includes(searchQuery))
        }
        return sortedProducts
    }


  return (
    <>
        <Container>
            <Row className='homeContainer'>
                <Col className='filtersContainer'>
                    <Filters/>
                </Col>
                <Col sm={9} className='productContainer'>
                    {
                        transformProducts().map((prod) => (
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
