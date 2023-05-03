import React from 'react'
import Row from '../Row/Row'

export default function GenerateBridge(props) {
    let keyValue = 0;
    const bridge = props.data.map((value)=> {
        keyValue++
        return(<Row key={keyValue} row={value}></Row>)
    })
  return (
    <div>{bridge}</div>
  )
}
