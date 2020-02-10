import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {NavBar} from '../components'
import {AdminPage, Cart, Details, LoginPage, Plugins, Profile, UserPlugins} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signIn" exact component={() => <LoginPage side={0}/>}/>
                <Route path="/signUp" exact component={() => <LoginPage side={2}/>}/>
                <Route path="/forgotPassword" exact component={() => <LoginPage side={1}/>}/>
                <MainApp/>
            </Switch>

        </Router>
    )
}

function MainApp() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/test" exact component={Details}/>
                <Route path="/admin" exact component={AdminPage}/>
                <Route path="/user/profile" exact component={Profile}/>
                <Route path="/user/plugins" exact component={UserPlugins}/>
                <Route path="/user/cart" exact component={Cart}/>
                <Route path="/" exact component={Plugins}/>
            </Switch>
        </>
    )
}

export default App
