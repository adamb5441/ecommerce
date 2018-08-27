import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class Form extends Component {
    constructor(){
        super()
        this.state={
            userIn: '',
            passIn: '',
            emailIn: ''
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
    input3(val){
        console.log(val)
        this.setState({
            emailIn: val
        })} 

      createUser(){
          console.log('function invocated')
          const {userIn, passIn, emailIn} = this.state

          axios.post('/api/newaccount', {userIn, passIn, emailIn}).then(res=>{
            let url = `${window.location.origin}/auth/callback`;
            
          }).catch(error=>{
            alert('username already exists')
          })

      } 
  render() {
    return (
      <div >
            <p>user name</p>
            <input onChange={e=>this.input(e.target.value)}></input>
            <p>password</p>
            <input onChange={e=>this.input2(e.target.value)}></input>
            <p>Email</p>
            <input onChange={e=>this.input3(e.target.value)}></input>
            <button onClick={()=>this.createUser()}></button>
            <p><Link to='/Login/'>back</Link></p>
      </div>
    );
  }
}


