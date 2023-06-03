import Bridge from '../Bridge/Bridge'
import React, { Component } from 'react'
import { Button } from '@mui/material';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {keydown: '', switch: false, time:90, lose:false};
      }
    logo = [[0,0,0,'B'],[0,0,0,'R'],[0,0,0,'I'],['W','O','R','D'],[0,0,0,'G'],[0,0,0,'E']]
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
    handleStartOver(){
      this.setState(prev => ({...prev, lose:false, time:90}))
    }
  render() {
    return (
      <>
        {this.state.lose && 
        <div>
          <div>YOU LOSE</div>
          <Button color="error" variant="contained" onClick={this.handleStartOver.bind(this)}>start over</Button>
        </div>}
        {!this.state.lose && <Bridge pressed={this.state.keydown} lose = {this.state.lose} switch = {this.state.switch} time={this.state.time} setTime={this.addTime.bind(this)}></Bridge>}
      </>
    )
  }
}

