import Bridge from '../Bridge/Bridge'
import React, { Component } from 'react'


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {keydown: '', switch: false};
      }
    
    detectKeyDown(e) {
        this.setState({keydown:e.key, switch: !this.state.switch})
    }
    componentDidMount(){
        document.removeEventListener('keyup', this.detectKeyDown)
        document.addEventListener('keyup', this.detectKeyDown.bind(this))
    }
    
  render() {
    return (
        <Bridge pressed={this.state.keydown} switch = {this.state.switch}></Bridge>
    )
  }
}

