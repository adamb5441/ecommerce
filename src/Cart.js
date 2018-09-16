import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button,Alert } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,Input,NavbarBrand } from 'reactstrap';
import { auto } from 'async';
export default class Cart extends Component {
    constructor(){
        super()
        this.state={
            products: [],
            userIn: 0
        }
    }
    componentDidMount(){
        axios.get('/api/Cart').then(res =>{
            console.log(res)
            this.setState({
                products: res.data,
            })
        })
    }
    update(){
        axios.get('/api/Cart').then(res =>{
            console.log(res)
            this.setState({
                products: res.data
            })
        })
    }
    input(val){
        console.log(val)
        this.setState({
            userIn: val
        })
    }
    deleteFromCart(id){
        console.log(id);
        let code=id
        axios.delete('/api/Cart/Delete/' + code).then(res=>{
            this.update()
        })
    }
    updateCart(ref){
        let num=this.state.userIn;
        axios.put('/api/Cart/update', {num,ref}).then(res=>{
            this.update()
        })
    }
    getProducts(){
        let items = [];

        for(let i =0; i< this.state.products.length; i++)
        {
            const { img,item, price,cart_id,numberof} = this.state.products[i]
            
            items.push(
                <Card className="col-sm-3 card container" style={{margin: '20px',width: '40vh'}}>
                    <CardImg top width="100%" src={img} alt="Card image cap" style={{height: '20vh'}}/>
                    <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>{item}</CardSubtitle>
                    <CardText>${price}</CardText>
                    <div className='row' style={{ display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <CardSubtitle col-sm-3>Quantity: </CardSubtitle>
                    <Input col-sm-3 defaultValue={numberof} onChange={e=>this.input(e.target.value)} style={{width: '8vh',}}/>
                    </div>
                    <Button style={{margin: '5px'}} color="primary" onClick={()=>this.updateCart(cart_id)}>update</Button>
                    <Button style={{margin: '5px'}} color="primary" onClick={()=>this.deleteFromCart(cart_id)}>Delete</Button>
                    </CardBody>
                </Card>
        )

        }
        return items;
    }
    checkOut(){
        axios.delete("/api/Cart/checkOut").then(res=>{
            alert('thank you for shopping')
            this.update()
        })
    }
  render() {
    return (
        <div>
        <Nav tabs className="navbar-light bg-primary" >
            <NavbarBrand style={{color: 'white', marginLeft: '15px'}} href="/">The Keyboard Warrior</NavbarBrand>
        </Nav>
        <Nav tabs style={{backgroundColor: '007BFF', color: 'white'}}>
        <NavItem>
            <NavLink href='http://localhost:3000/#/Login/'>Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='http://localhost:3000/#/'>Home</NavLink>
        </NavItem>
        <Button color='primary' style={{marginLeft: 'auto',height: '100%'}} onClick={()=> this.checkOut()}>checkout</Button>
        </Nav>
        <div className='container'>
            <div className='row' style={{display: 'flex', justifyContent: 'center'}}> 
                {this.getProducts()}
            </div>
        </div>

      </div>
    );
  }
}
function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
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
  

