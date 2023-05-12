import './Square.css'
import React from 'react'
import points from '../../../data/point_values.json'

export default function Square(props) {
  let square;
  if(props.value === 1){
    square = <div className='square-container-empty'></div>
  } else {
    square = <div className='square-container'><div className='letter'>{props.value}</div>
    <div className='point'>{points[props.value]}</div></div>
  }
  return (
    square
  )
}

