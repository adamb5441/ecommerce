import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Display from './ProductDisplayer'
import axios from 'axios'
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
    updateCart(id){

        let num=this.state.userIn;
        axios.put('/api/Cart/update', {num,id}).then(res=>{
            this.update()
        })
    }
    getProducts(){
        let items = [];

        for(let i =0; i< this.state.products.length; i++)
        {
            const { img,item, price,cart_id,numberof} = this.state.products[i]
            items.push(
            <div>
            <Display 
                img={img}
                item={item}
                price={price}
                key={cart_id}

            />
            <p>quantity: {numberof}</p>
            <input onChange={e=>this.input(e.target.value)}></input>
            <button onClick={()=>this.updateCart(cart_id)}>update</button>
            <button onClick={()=>this.deleteFromCart(cart_id)}>Delete</button>
            </div>
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
            I am the cart
            <Link to='/'>App</Link>
            <button onClick={()=> this.checkOut()}>checkout</button>
            {this.getProducts()}

      </div>
    );
  }
}


