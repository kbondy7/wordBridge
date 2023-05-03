import React from 'react'
import './Letters.css'


export default function Letters(props) {
    const letters = [...props.data]
    let keyValue = 0;
    const output = letters.map((value)=>{
        keyValue++
        return(<div key={keyValue} className='letter'>{value}</div>)
})
  return (
    <div className='t'>{output}</div>
  )
}
