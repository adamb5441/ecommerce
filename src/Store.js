import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import  Router  from './Router';
import Display from './ProductDisplayer'
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
    addToCart(id){
        console.log(id);
        let num = 1;
        axios.post('/api/Cart/Create', {id, num}).then(res=>{
            alert('added to cart')
        })
    }
    getProducts(){
        let items = [];

        for(let i =0; i< this.state.products.length; i++)
        {
            const { img,item, price,id} = this.state.products[i]
            items.push(
            <div>
            <Display 
                img={img}
                item={item}
                price={price}
                key={id}

            />
            <button onClick={()=>this.addToCart(id)}>add</button>
            </div>
        )

        }
        return items;
    }
  render() {
    return (
      <div >
          <Link to='/Login/'>Login</Link>
          <Link to='/Cart/'>Cart</Link>
      {this.getProducts()}
      
      </div>
    );
  }
}

export default Store;
