import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
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
            this.props.history.push('/')
        }).catch(error=>{
          alert('That password and username combination does not exist')
        })
    } 

  render() {
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink href='http://localhost:3000/#/Form/'>Create account</NavLink>
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
            <Button color="primary" style={{margin: 10}} onClick={()=>this.login()}>Submit</Button>
            <Label >or create and account <Link to='/Form/'>here</Link></Label >
        </FormGroup>
      </div>
      </div>
    );
  }
}


