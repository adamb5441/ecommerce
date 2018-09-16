import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

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
            this.props.history.push('/')
            
          }).catch(error=>{
            alert('username already exists')
          })

      } 
  render() {
    return (
        <div>
              <Nav tabs>
                  <NavItem>
                      <NavLink href='http://localhost:3000/#/Login/'>Back</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink href='http://localhost:3000/#/'>Home</NavLink>
                  </NavItem>
              </Nav>
        <div style={{display: 'flex',justifyContent: 'center'}}>
            <FormGroup style={{margin: '60px', width: '40vh',}}>
              <Label >username</Label >
              <Input defaultValue='adam' onChange={e=>this.input(e.target.value)}></Input>
              <Label >password</Label >
              <Input defaultValue='1234' onChange={e=>this.input2(e.target.value)}></Input>
              <Label>Email</Label>
              <Input onChange={e=>this.input3(e.target.value)}></Input>
              <Button color="primary" style={{margin: 10}} onClick={()=>this.login()}>Submit</Button>
          </FormGroup>
        </div>
        </div>
    );
  }
}


