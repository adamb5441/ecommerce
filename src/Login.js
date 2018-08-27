import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


export default class Login extends Component {
    constructor(){
        super()
        this.state={
            userIn: '',
            passIn: ''

        }
    }
    input(val){
        console.log(val)
        this.setState({
            userIn: val
        })}
    input2(val){
        console.log(val)
        this.setState({
            passIn: val
        })}
    login(){
        console.log('function invocated')
        const {userIn, passIn } = this.state
        console.log(userIn)
        axios.post('/api/Login', {userIn, passIn}).then(res=>{
            alert('logged in')
        }).catch(error=>{
          alert('That password and username combination does not exist')
        })
    } 

  render() {
    return (
      <div >
            <p>user name</p>
            <input onChange={e=>this.input(e.target.value)}></input>
            <p>password</p>
            <input onChange={e=>this.input2(e.target.value)}></input>
            <button onClick={()=>this.login()}></button>
            <p>or create and account <Link to='/Form/'>here</Link></p>
            <p><Link to='/'>back</Link></p>
      </div>
    );
  }
}


