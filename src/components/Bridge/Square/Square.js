import './Square.css'
import React from 'react'

export default function Square(props) {
  let square;
  if(props.value === 1){
    square = <div className='square-container'></div>
  } else {
    square = <div className='square-container'>{props.value}</div>
  }
  return (
    square
  )
}

