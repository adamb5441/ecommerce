import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Alert,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom'
import  Router  from './Router';
import axios from 'axios'
const lscart = getFromLS("cart") || [];
const login = getFromLS("confirm") || false;
class Store extends Component {
    constructor(){
        super()
        this.state={
            cart: JSON.parse(JSON.stringify(lscart)),
            confirm: JSON.parse(JSON.stringify(login)),
            products: [],
            selected: [],
            toggle: false
        }
    }
    componentDidMount(){
        axios.get("/api/products").then(res =>{
            console.log(res)
            this.setState({
                products: res.data
            })
        })
    }
    addToCart(ref){
        let num = 1;
        axios.get("/api/checkSession").then(res=>{
            let check = res.data
        if(check){
            axios.post('/api/Cart/Create', {ref, num}).then(res=>{
            this.setState({
                confirm: true
            })
        })}
        else { 
        let obj = {ref,num}
        let ind = this.state.selected.findIndex(val => val.ref == obj.ref)
        console.log(ind)
        if(ind>-1){
            let arr = this.state.selected.slice(0)
            let numberof=arr[ind].num;
            arr[ind].num=numberof+1
            saveToLS("cart", arr);
        } else{
        this.setState({
            selected: [...this.state.selected,obj]
        })
        let arr = this.state.selected.slice(0)
        saveToLS("cart", arr); 
    }
    }
    })
    }
    getProducts(){ 
        let items = [];

        for(let i =0; i< this.state.products.length; i++)
        {
            const { img,item, price,id} = this.state.products[i]
            items.push(
        
            <Card className="col-sm-3 card" style={{margin: '20px', padding: 'auto'}}>
                <CardImg top width="100%" src={img} alt="Card image cap" style={{height: '20vh'}}/>
                <CardBody>
                <CardTitle>{item}</CardTitle>
                <CardText>${price}</CardText>
                <Button color="primary" onClick={()=>this.addToCart(id)}>add</Button>
                </CardBody>
                {/* <Alert color="success">
                This is a success alert — check it out!
                </Alert> */}
            </Card>
            

        )

        }
        return items;
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
            <NavLink href='http://localhost:3000/#/Cart/'>Cart</NavLink>
        </NavItem>
        </Nav>
      <div className='container' >
        <div className='row' style={{display: 'flex', justifyContent: 'center'}}> 
            {this.getProducts()}
        </div>
      </div>
      </div>
    );
  }
}
function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value,
        })
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

export default Store;
