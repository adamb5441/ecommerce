import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,NavbarBrand } from 'reactstrap';
export default class Login extends Component {
    constructor(){
        super()
        this.state={
            userIn: 'adam',
            passIn: '1234',
            cart: [],
            alertToggle: false,
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
    login(){
        console.log('function invocated')
        const {userIn, passIn } = this.state
        console.log(userIn)
        axios.post('/api/Login', {userIn, passIn}).then(res=>{
            if(this.state.cart.length>0){
                let array = this.state.cart.slice(0)
                axios.post('/api/cart/reconcile', {array}).then(data=>{
                    console.log('reconciled')
                })
            }
            this.props.history.push('/')  
        }).catch(error=>{
          this.invokeAlert('That password and username combination does not exist')
        })
        saveToLS("cart", [])
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
  




