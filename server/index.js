const express = require('express')
const bodyparser = require ('body-parser');
const massive = require('massive')
require('dotenv').config()
const app = express()
controller=require('./controller')
app.use(bodyparser.json());
const {CONNECTION_STRING}=process.env;

const port = 4000;
massive(CONNECTION_STRING).then(dbInstance =>{
    app.set('db', dbInstance)
    app.listen(port, ()=>{ console.log(`Banging my head against the wall at ${port}`)})
})

app.get('/api/products', controller.getProducts)
app.post('/api/Cart/Create', controller.createCart)
app.get('/api/Cart', controller.getCart)
app.delete('/api/Cart/Delete/:id', controller.deleteFromCart)
app.delete("/api/Cart/checkOut", controller.checkOut)
app.put("/api/Cart/update", controller.updateCart)