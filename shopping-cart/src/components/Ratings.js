import React from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

const Ratings = ({ rating, onClick, style }) => {
    
  return (
    <>
      {
        [...Array(5)].map((_, i) => (
            <span key={i}>
                {rating > i ? ( <AiFillStar fontSize="15px" />) : ( <AiOutlineStar fontSize="15px" />)} 
            </span>
        ))
      }
    </>
  )
}

export default Ratings
