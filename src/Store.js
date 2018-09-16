import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
import  Router  from './Router';
import axios from 'axios'
class Store extends Component {
    constructor(){
        super()
        this.state={
            products: []
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
        console.log(ref);
        let num = 1;
        axios.post('/api/Cart/Create', {ref, num}).then(res=>{
            alert('added to cart')
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
            </Card>
            

        )

        }
        return items;
    }
  render() {
    return (
        <div>
        <Nav tabs>
        <NavItem>
            <NavLink href='http://localhost:3000/#/Login/'>Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='http://localhost:3000/#/Cart/'>Cart</NavLink>
        </NavItem>
        </Nav>
      <div className='container'>
        <div className='row'> 
            {this.getProducts()}
        </div>
      </div>
      </div>
    );
  }
}

export default Store;
