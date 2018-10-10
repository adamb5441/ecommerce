import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Alert,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Jumbotron,Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink,NavbarBrand, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import  Router  from './Router';
import axios from 'axios'
class Store extends Component {
    constructor(){
        super()
        this.state={
            cart: [],
            products: [],
            toggle: 0,
            toggleView: false,
            index: -1,
            alertToggle: false,
            alertInfo: "",
            renderSet: 1,
            searchVal: '',
            baseProducts: [],
            dropdownOpen: false,
            sortToggle: false
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        console.log(this.state.cart.length)
        if(this.state.cart.length==0){
            saveToLS("cart", [])
        } else {
        this.setState({
            cart: JSON.parse(JSON.stringify(getFromLS("cart")))
        })
    }

        axios.get('/api/checkSession').then(res=>{
            if(res.data){
            this.setState({
                toggle: 1
            })
        }
        })
        axios.get("/api/products").then(res =>{
            console.log(res)
            this.setState({
                products: res.data,
                baseProducts: res.data
            })
        })
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
    addToCart(ref){
        console.log(ref)
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
        let ind = this.state.cart.findIndex(val => val.ref == ref)
        console.log(ind)
        if(ind>-1){
            let arr = this.state.cart.slice(0)
            let numberof=arr[ind].num;
            arr[ind].num=numberof+1
            this.setState({
                cart: [...arr]
            })
            saveToLS("cart", arr);
        } else{
        this.setState({
            cart: [...this.state.cart,obj]
        }) 
        let arr = this.state.cart.slice(0)
        saveToLS("cart", arr); 
    }
    }
    })
    this.invokeAlert("The item has been added to you cart")
    } 
    getProducts(){ 
        let items = [];
        let multiplier = this.state.renderSet
        let end = 12 * multiplier
        let start = end-12
        for(let i =start; i< this.state.products.length && i<end ; i++)
        {
            const { img,item, price,id} = this.state.products[i]
            items.push(
        
            <Card className="col-sm-3 card"  style={{margin: '20px', padding: '30px', boxShadow: '1px .5px .5px #d1d3d3'}}>
                <div>
                <CardImg onClick={()=>this.setproduct(i)} className="info"top width="100%" src={img} alt="Card image cap" style={{height: ''}}/>
                <CardBody>
                <CardTitle>{item}</CardTitle>
                <CardText>${price}</CardText>
                <Button color="primary" onClick={()=>this.addToCart(id)}>add to cart</Button>
                </CardBody>
                </div>
            </Card>
            

        )

        }
        return items;
    }
    filterProducts(){
        let arr = [...this.state.baseProducts]
        let results=arr.filter(val => val.item.toLowerCase().includes(this.state.searchVal.toLowerCase()))
        this.setState({
            products: [...results]
        })
    }
    sortByAlphabet(){
        let arr = [...this.state.baseProducts]
        let results=arr.sort((a,b)=>{
            if(a.item < b.item) return -1
            if(a.item > b.item) return 1
        })
        this.setState({
            products: [...results],
            sortToggle: true
        })
    }
    sortFromLeast(){
        let arr = [...this.state.baseProducts]
        let results=arr.sort((a,b)=>a.price-b.price)
        this.setState({
            products: [...results],
            sortToggle: true
        })
    }
    sortFromGreatest(){
        let arr = [...this.state.baseProducts]
        let results=arr.sort((a,b)=>b.price-a.price)
        this.setState({
            products: [...results],
            sortToggle: true
        })
    }
    setproduct(i){
        if(i>=0)
        {
            this.setState({
            index: i,
            toggleView: true})
        } else{
            this.setState({
                index: -1,
                toggleView: false})
        }

    }
    view(){ 
            const { img,item, price,id} = this.state.products[this.state.index]
            return(
            <Jumbotron style={{backgroundColor: 'white', width: '100%'}}>
            <div >
                    <img src={img} style={{width: '25vh'}}/>
                    <p>
                        {item}
                    </p>
                    <p> 
                        ${price}
                    </p>

            </div>
            <hr className="my-2" />
                <p className="lead">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                <p className="lead">
                <Button color="primary" onClick={()=>this.addToCart(id)}>add to cart</Button>
                </p>
                <Button onClick={()=>this.setproduct(-1)} color="primary" style={{float: 'left'}}>back</Button>
            </Jumbotron>
            

        )
        
    }
    invokeAlert(str){
        this.setState({
            alertInfo: str,
            alertToggle: true
        })
        setTimeout(()=>this.setState({alertToggle: false}),3000)
    }
    getNavigator(){
    let count =Math.ceil(this.state.products.length /12)
    console.log(count)
    let output = []
    for(let i=0;i<count;i++){
    output.push(<PaginationItem>
    <PaginationLink onClick={()=> this.setState({renderSet: i+1})}>
        {i+1}
    </PaginationLink>
    </PaginationItem>)
    }
    return output
}
    toggle() {
        this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }
    clear(){
        let base = [...this.state.baseProducts]
        this.setState({
            products: [...base],
            sortToggle: false
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
            <div>
                <Nav tabs className="navbar-light bg-primary " style={{padding: '2px' }}>
                    <img src='https://danielpaulmarshall.files.wordpress.com/2017/05/keyboard-warrior.png' style={{height: '40px'}}/>
                    <NavbarBrand style={{color: 'white', marginLeft: '15px'}} href="/">The Keyboard Warrior</NavbarBrand>
                </Nav>
                <Nav tabs style={{backgroundColor: '007BFF', color: 'white'}}>
                <NavItem>
                    <Link to='/Login/'><NavLink >Login</NavLink></Link>
                </NavItem>
                <NavItem>
                    <Link to='/Cart/'><NavLink >Cart</NavLink></Link>
                </NavItem>\
                <div>
                    <InputGroup>
                    <Input onChange={e => this.setState({searchVal: e.target.value})} placeholder="search products" />
                        <InputGroupAddon addonType="append">
                            <Button onClick={()=>this.filterProducts()} color='primary'>search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle color='primary' caret>
                    Sort by
                </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={()=>this.sortByAlphabet()}>Alphabet</DropdownItem>
                    <DropdownItem onClick={()=>this.sortFromLeast()}>Price(lowest)</DropdownItem>
                    <DropdownItem onClick={()=>this.sortFromGreatest()}>Price(Highest)</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
                {
                this.state.sortToggle ?
                <div>
                    <Button onClick={()=>this.clear()} color='primary'>Clear</Button>
                </div>
                :
                null
                }
                {
                this.state.toggle == 1 ?
                <Button color='primary' style={{marginLeft: 'auto',height: '100%'}} onClick={()=> this.logout()}>logout</Button>
                : 
                null
                }
                </Nav>
                {
                this.state.toggleView ?
                <div className='container' >
                     <div className='row' style={{display: 'flex', justifyContent: 'center'}}> 
                            {this.view()}
                     </div>
                </div>
                :
                <div className='container' style={{backgroundColor: '#eaeded'}}>
                    <div className='row' style={{display: 'flex', justifyContent: 'center'}}> 
                        {this.getProducts()}
                    </div>
                </div>
                }
        </div>
        {
        this.state.toggleView ?
        null
        :
        <Pagination style={{display: 'flex', justifyContent: 'center'}} aria-label="Page navigation example">
                {this.getNavigator()}
        </Pagination>
        }
        <footer style={{height: '30px',marginTop: 'auto',position: 'abo' , backgroundColor: '#007bff', color: 'WHITE'}}>website by Adam</footer>
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
