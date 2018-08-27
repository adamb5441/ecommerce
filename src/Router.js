import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Store from './Store'
import Cart from './Cart'
import Login from './Login'
import Form from './Form'
export default (
    <Switch>
        <Route exact path='/' component={Store} />
        <Route path='/Cart/' component={Cart} />
        <Route path='/Login/' component={Login}></Route>
        <Route path='/Form/' component={Form}></Route>
    </Switch>
)