import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,Input } from 'reactstrap';
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
                <Card className="col-sm-4 card container" style={{margin: '20px', padding: 'auto',}}>
                    <CardImg top width="100%" src={img} alt="Card image cap" style={{height: '20vh'}}/>
                    <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>{item}</CardSubtitle>
                    <CardText>${price}</CardText>
                    <div className='row' style={{ justifyContent: 'center'}}>
                    <CardText col-sm-3>Quantity: </CardText>
                    <Input col-sm-3 defaultValue={numberof} onChange={e=>this.input(e.target.value)} style={{width: '8vh',}}/>
                    </div>
                    <Button color="primary" onClick={()=>this.updateCart(cart_id)}>update</Button>
                    <Button color="primary" onClick={()=>this.deleteFromCart(cart_id)}>Delete</Button>
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
        <Nav tabs>
            <NavItem>
                <NavLink href='http://localhost:3000/#/Login/'>Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href='http://localhost:3000/#/'>Home</NavLink>
            </NavItem>
            <Button color="primary" style={{marginLeft: 'auto'}} onClick={()=> this.checkOut()}>checkout</Button>
        </Nav>
            {this.getProducts()}

      </div>
    );
  }
}


