import React from 'react'
import './Letters.css'
import points from '../../../data/point_values.json'

export default function Letters(props) {
    const letters = [...props.data]
    let keyValue = 0;
    const output = letters.map((value)=>{
        keyValue++
        return(<div key={keyValue} className='letter-container'>
          <div className='letter'>{value}</div>
          <div className='point'>{points[value]}</div>
          </div>)
})
  return (
    <div className='t'>{output}</div>
  )
}
