import Bridge from '../Bridge/Bridge'
import React, { Component } from 'react'


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {keydown: '', switch: false, time:90, lose:false};
      }
    
    detectKeyDown(e) {
        this.setState({keydown:e.key, switch: !this.state.switch})
    }
    timer() {
      if(this.state.time < 1){
        this.setState(prev => ({...prev, lose:true}))
      }
      this.setState(prev => ({...prev, time:prev.time-1}))
    }
    addTime(){
      console.log("time added")
      this.setState(prev => ({...prev, time:prev.time+20}))
    }
    componentDidMount(){
        setInterval(this.timer.bind(this), 1000)
        document.removeEventListener('keyup', this.detectKeyDown)
        document.addEventListener('keyup', this.detectKeyDown.bind(this))
    }
    
  render() {
    return (
      <>
        {this.state.lose && <div>YOU LOSE</div>}
        {!this.state.lose && <Bridge pressed={this.state.keydown} switch = {this.state.switch} time={this.state.time} setTime={this.addTime.bind(this)}></Bridge>}
      </>
    )
  }
}

