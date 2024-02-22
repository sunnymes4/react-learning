import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { CartState } from '../context/context'

function Filters() {
  const { filterProdState: {sortByPrice, byStock, byFastDelivery, byRating},
          filterProdDispatch
        } = CartState();
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          name='ascDesc'
          label="Ascending"
          type='radio'
          onChange={() => filterProdDispatch({
            type: 'SORT_BY_PRICE',
            payload: 'lowToHigh'
          })}
          checked={sortByPrice === 'lowToHigh' ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name='ascDesc'
          label="Descending"
          type='radio'
          onChange={() => filterProdDispatch({
            type: 'SORT_BY_PRICE',
            payload: 'highToLow'
          })}
          checked={sortByPrice === 'highToLow' ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          name='filter'
          label="Include Out of Stock"
          type='checkbox'
          onChange={() => {
            filterProdDispatch({
              type: 'SORT_BY_STOCK',
            })
          }}
          checked = {byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          name='filter'
          label="Fast Delivery Only"
          type='checkbox'
          onChange={() => {
            filterProdDispatch({
              type: 'SORT_BY_FAST_DELIVERY',
            })
          }}
          checked = {byFastDelivery}
        />
      </span>
      <span>
        <label>Ratings : </label>
        {
          [...Array(5)].map((_, i) => (
              <span key={i} onClick={() => filterProdDispatch({
                type: 'SORT_BY_RATING',
                payload: i+1
              })}>
                  {byRating > i ? ( <AiFillStar fontSize="15px" />) : ( <AiOutlineStar fontSize="15px" />)} 
              </span>
          ))
        }
      </span>
      <Button
        variant="warning"
        onClick={() => filterProdDispatch({
          type: 'CLEAR_FILTERS'
        })}
      >
        Clear Filters
      </Button>
    </div>
  )
}

export default Filters
