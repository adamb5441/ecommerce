import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,NavbarBrand } from 'reactstrap';

export default class Form extends Component {
    constructor(){
        super()
        this.state={
            userIn: '',
            passIn: '',
            emailIn: '',
            cart: [],
            alertToggle: false
        }
    }
    componentDidMount(){
        axios.get('/api/checkSession').then(res=>{
            this.setState({
                cart: JSON.parse(JSON.stringify(getFromLS("cart")))
            })
        })
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
                const {userIn, passIn, emailIn} = this.state
                axios.post('/api/newaccount', {userIn, passIn, emailIn}).then(res=>{
                    if(this.state.cart.length>0){
                        let array = this.state.cart.slice(0)
                        axios.post('/api/cart/reconcile', {array}).then(data=>{
                            console.log('reconciled')
                        })
                    }
                    this.props.history.push('/')
                    saveToLS("cart", [])
                }).catch(error=>{
                    this.invokeAlert('username already exists')
          })
      }
      invokeAlert(str){
        this.setState({
            alertInfo: str,
            alertToggle: true
        })
        setTimeout(()=>this.setState({alertToggle: false}),3000)
    } 
  render() {
    return (
        <div>   
                {
                this.state.alertToggle ?
                <Alert color="danger" style={{position: 'fixed', marginBottom: 'auto', width: '100%', zIndex: '6', transition: '.25s'}}>
                {this.state.alertInfo}
                </Alert>
                :
                null
                }
                <Nav tabs className="navbar-light bg-primary" >
                    <NavbarBrand style={{color: 'white', marginLeft: '15px'}} href="/">The Keyboard Warrior</NavbarBrand>
                </Nav>
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
              <Input onChange={e=>this.input(e.target.value)}></Input>
              <Label >password</Label >
              <Input onChange={e=>this.input2(e.target.value)}></Input>
              <Label>Email</Label>
              <Input onChange={e=>this.input3(e.target.value)}></Input>
              <Button color="primary" style={{margin: 10}} onClick={()=>this.createUser()}>Submit</Button>
          </FormGroup>
        </div>
        </div>
    );
  }
}
function getFromLS(key) {
    let ls = [];
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || [];
      } catch (e) {
        console.log('failed cart')
      }
    }
    return ls[key];
  }
  
  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
  


