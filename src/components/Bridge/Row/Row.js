import React from 'react'
import './Row.css'
import Square from '../Square/Square'
import BlockedSquare from '../Square/BlockedSquare'

export default function Row(props) {
    const row = props.row
    let keyValue = 0;
    const itemList = row.map((value)=> {
        if(value === 0){
            keyValue++
            return <BlockedSquare key={keyValue}></BlockedSquare>
        } else{
            keyValue++
           return <Square key={keyValue} value={value}></Square>
        }
    }
    )
  return (
    <div className='row'>{itemList}</div>
  )
}

