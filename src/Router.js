import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Store from './Store'
import Cart from './Cart'
export default (
    <Switch>
        <Route exact path='/' component={Store} />
        <Route path='/Cart/' component={Cart} />
    </Switch>
)