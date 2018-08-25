import React from 'react';
import './App.css';



export default function Diplayer(props){
    const {img,item,price, key} =props
    return (
      <div >
          <img src={img} style={{height: '10vh'}}/>
          {item}
          <p>${price}</p>
      </div>
    )
}
