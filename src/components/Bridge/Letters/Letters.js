import React from 'react'
import './Letters.css'
import points from '../../../data/point_values.json'

export default function Letters(props) {
    function onPress(event){
      console.log(event.target.innerHTML)
      props.detectKeyDown(event.target.innerHTML)
    }
    const letters = [...props.data]
    let keyValue = 0;
    const output = letters.map((value)=>{
        keyValue++
        return(<div key={keyValue} className='letter-container' onClick={onPress}>
          <div className='letter'>{value}</div>
          <div className='point'>{points[value]}</div>
          </div>)
})
  return (
    <div className='t'>{output}</div>
  )
}
