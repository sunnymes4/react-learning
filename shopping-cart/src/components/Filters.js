import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { CartState } from '../context/context'

function Filters({rating}) {
  const {state, dispatch} = CartState();
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          name='ascDesc'
          label="Asceending"
          type='radio'
          onChange={() => {

          }}
        />
      </span>
      <span>
        <Form.Check
          inline
          name='ascDesc'
          label="Descending"
          type='radio'
        />
      </span>
      <span>
        <Form.Check
          inline
          name='filter'
          label="Include Out of Stock"
          type='checkbox'
        />
      </span>
      <span>
        <Form.Check
          inline
          name='filter'
          label="Fast Delivery Only"
          type='checkbox'
        />
      </span>
      <span>
        <label>Ratings : </label>
        {
          [...Array(5)].map((_, i) => (
              <span key={i}>
                  {rating > i ? ( <AiFillStar fontSize="15px" />) : ( <AiOutlineStar fontSize="15px" />)} 
              </span>
          ))
        }
      </span>
      <Button
        variant="warning"
      >
        Clear Filters
      </Button>
    </div>
  )
}

export default Filters
