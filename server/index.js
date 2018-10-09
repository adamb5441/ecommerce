const express = require('express')
const bodyparser = require ('body-parser');
const massive = require('massive')
require('dotenv').config()
const bcrypt = require('bcrypt');
const session = require('express-session')
const app = express()
controller=require('./controller')
const path = require('path');
app.use( express.static( `${__dirname}/build` ) );
app.use(bodyparser.json());
const {CONNECTION_STRING,SESSION_SECRET}=process.env;
app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      expires: 86400000
    })
  ); 
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
app.get("/api/checkSession", controller.checkSession)
app.post('/api/cart/reconcile', controller.reconcileCarts)

app.post('/api/newaccount', (req,res)=>{
    const {userIn,passIn,emailIn} = req.body
    const dbInstance=req.app.get('db');
    dbInstance.getProfile([userIn]).then(data => {
    if(data[0]){
    res.status(400).send('user name already exist')
    }else{
        bcrypt.hash(passIn, 10, function(err, hash) {
            dbInstance.createProfile([userIn,hash,emailIn]).then( data =>{
                console.log(data[0])
                req.session.users=data[0];
                res.redirect('/');
        })
      });
    }
})
})
app.post('/api/logout',(req,res)=>{
    const {session} =req
    session.destroy()
    res.status(200).send('good')
})
app.post('/api/Login',(req,res,next)=>{
        const {userIn,passIn} = req.body
        const dbInstance=req.app.get('db');
        dbInstance.getProfile([userIn]).then(data => {
        console.log(data[0]);
        if(data[0]) {         
            bcrypt.compare(passIn, data[0].pass, function(err, response) {
            if(response)
            {
                req.session.users=data[0]
                res.status(200).send('good')
            }else{
                res.status(401).send('nope')
            }
        })
        } else {
         res.status(400).send('not found')
        }
    }) 
      
},)