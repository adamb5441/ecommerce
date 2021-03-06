import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button,Alert } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,Input,NavbarBrand } from 'reactstrap';
// const lscart = getFromLS("cart") || [];
export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            products: [],
            productsLs: [],
            cart: [],
            userIn: 0,
            toggle: 3,
            alertToggle: false,
        }
    }
    componentDidMount(){
        var check = '';
        axios.get('/api/checkSession').then(res=>{
            this.setState({
                cart: JSON.parse(JSON.stringify(getFromLS("cart")))
            })
        if(res.data){
        axios.get('/api/Cart').then(results =>{
            console.log(results)
            this.setState({
                products: results.data,
                toggle: 1
            })
            return console.log('logged in')
        })
        } else if(this.state.cart.length>0){
            console.log('local storage')
            axios.get('/api/products').then(results=>{
                console.log(results)
                this.setState({
                    productsLs: results.data,
                    toggle: 2
                })
            })
        } else{
            this.setState({
                toggle: 3
            })
        }
    }) 
    }
    update(){
        var check = '';
        axios.get('/api/checkSession').then(res=>{
        
        if(res.data){
        axios.get('/api/Cart').then(results =>{
            console.log(results)
            this.setState({
                products: results.data,
                toggle: 1
            })
            return console.log('logged in')
        })
        } else if(this.state.cart.length>0){
            console.log('local storage')
            axios.get('/api/products').then(results=>{
                console.log(results)
                this.setState({
                    productsLs: results.data,
                    toggle: 2
                })
            })
        } else{
            this.setState({
                toggle: 3
            })
        }
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
        let num=Number(this.state.userIn);
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
                <Card className="col-sm-3 card " style={{margin: '20px', padding: '30px'}}>
                    <div key={cart_id}>
                        <CardImg src={img} alt="Card image cap" />
                        <CardBody>
                        <CardSubtitle>{item}</CardSubtitle>
                        <CardText>${price}</CardText>
                        <div className='row' style={{ display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                        <CardSubtitle col-sm-3>Quantity: </CardSubtitle>
                        <Input col-sm-3 defaultValue={numberof} onChange={e=>this.input(e.target.value)} style={{width: '8vh',}}/>
                        </div>
                        <Button style={{margin: '5px'}} color="primary" onClick={()=>this.updateCart(cart_id)}>update</Button>
                        <Button style={{margin: '5px'}} color="primary" onClick={()=>this.deleteFromCart(cart_id)}>Delete</Button>
                        </CardBody>
                    </div>
                </Card>
        )

        }
        return items;
    }
    getLS(){
        console.log(this.state.cart[0].ref)
        let items = [];
            for(let i =0; i< this.state.cart.length; i++){ 
                const {ref,num}=this.state.cart[i]
                for(let i =0; i< this.state.productsLs.length; i++)
                {
                    const { img,item, price,id} = this.state.productsLs[i]
                if(ref===id){
                items.push(
                <Card className="col-sm-3 card container" style={{margin: '20px',padding: '30px'}}>
                    <CardImg top width="100%" src={img} alt="Card image cap" />
                    <CardBody>
                    <CardSubtitle>{item}</CardSubtitle>
                    <CardText>${price}</CardText>
                    <div className='row' style={{ display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <CardSubtitle col-sm-3>Quantity: </CardSubtitle>
                    <Input col-sm-3 defaultValue={num} onChange={e=>this.input(e.target.value)} style={{width: '8vh',}}/>
                    </div>
                    <Button onClick={()=>this.updateLs(id)} style={{margin: '5px'}} color="primary" >update</Button>
                    <Button onClick={() => this.deleteLs(id)} style={{margin: '5px'}} color="primary" >Delete</Button>
                    </CardBody>
                </Card>
        )
    }
    }
        }console.log(items)
        return items;
    }
    checkOut(){
        axios.delete("/api/Cart/checkOut").then(res=>{
            this.update()
        })
        saveToLS("cart", [])
        this.setState({
            cart: []
        })
        this.invokeAlert('Thank you for shopping')
    }
    invokeAlert(str){
        this.setState({
            alertInfo: str,
            alertToggle: true
        })
        setTimeout(()=>this.setState({alertToggle: false}),3000)
    }
    deleteLs(id){
        let arr = this.state.cart.filter(val => val.ref != id)
        this.setState({
            cart: [...arr]
        })
        saveToLS("cart", arr);
        this.update()
    }
    updateLs(id){
        let numberof=Number(this.state.userIn);
        let ind = this.state.cart.findIndex(val => val.ref == id)
        let arr = this.state.cart.slice(0)
        arr[ind].num=numberof
        this.setState({
            cart: [...arr]
        })
        saveToLS("cart", arr); 
    }
    logout(){
        axios.post('/api/logout').then(data =>{
        this.setState({
            toggle: 3,
            cart:[]
        })
        this.invokeAlert('logged out')
    })
    }
  render() {
    return (
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        {
        this.state.alertToggle ?
        <Alert color="success" style={{position: 'fixed', marginBottom: 'auto', width: '100%', zIndex: '6', transition: '.25s'}}>
        {this.state.alertInfo}
        </Alert>
        :
        null
        }
        <Nav tabs className="navbar-light bg-primary" style={{padding: '1px'}}>
        <img src='https://danielpaulmarshall.files.wordpress.com/2017/05/keyboard-warrior.png' style={{height: '40px'}}/>
            <NavbarBrand style={{color: 'white', marginLeft: '15px'}} href="/">The Keyboard Warrior</NavbarBrand>
        </Nav>
        <Nav tabs style={{backgroundColor: '007BFF', color: 'white'}}>
        <NavItem>
        <Link to='/Login/'><NavLink >Login</NavLink></Link>
        </NavItem>
        <NavItem>
            <Link to='/'><NavLink >Home</NavLink></Link>
        </NavItem>
        <Button color='primary' style={{marginLeft: 'auto',height: '100%'}} onClick={()=> this.checkOut()}>checkout</Button>
        {
        this.state.toggle == 1 ?
        <Button color='primary' style={{height: '100%'}} onClick={()=> this.logout()}>logout</Button>
        : 
        null
        }
        </Nav>
        <div className='container'>
            <div className='row' style={{display: 'flex', justifyContent: 'center'}}> 
                {this.state.toggle ==1 ?
                this.getProducts() 
                : this.state.toggle ==2 && this.state.cart.length >0 ?
                this.getLS() 
                :
                null
                }
            </div>
        </div>
        <footer style={{height: '30px',marginTop: 'auto',position: 'abo' , backgroundColor: '#007bff', color: 'WHITE'}}>website by Adam</footer>
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
  

