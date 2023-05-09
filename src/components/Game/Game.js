import Bridge from '../Bridge/Bridge'
import React, { Component } from 'react'


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {keydown: '', switch: false, time:200};
      }
    
    detectKeyDown(e) {
        this.setState({keydown:e.key, switch: !this.state.switch})
    }
    timer() {
      this.setState(prev => ({...prev, time:prev.time-1}))
    }
    componentDidMount(){
        setInterval(this.timer.bind(this), 1000)
        document.removeEventListener('keyup', this.detectKeyDown)
        document.addEventListener('keyup', this.detectKeyDown.bind(this))
    }
    
  render() {
    return (
        <Bridge pressed={this.state.keydown} switch = {this.state.switch} time={this.state.time}></Bridge>
    )
  }
}

