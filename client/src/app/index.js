import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import myReducer from '../redux/ReduxStore'
import { NavBar } from '../components'
import { AdminPage, Cart, Details, LoginPage, Plugins, Profile, UserPlugins } from '../pages';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as storage from 'redux-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createEngine from 'redux-storage-engine-localstorage';
import REDUX_KEY from '../redux/ReduxKeys';
import { ToastContainer } from "react-toastify";
import {NotFound} from "../pages/NotFound";
import apis from '../api';


storage.reducer(combineReducers(myReducer));
const engine = createEngine('root');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(myReducer);
const load = storage.createLoader(engine);
load(store)
    .then((newState) => {
        store.dispatch({ type: REDUX_KEY.LOGIN, value: newState.tokenReducer.user });
        store.dispatch({ type: REDUX_KEY.RESTORE, value: newState.cartReducer.cart });
        apis.getMyCart(newState.tokenReducer.user._id).then(res => {
            store.dispatch({ type: REDUX_KEY.RESTORE, value: res.data.cart });
        })
        console.log('Loaded state:', newState)
    })
    .catch(() => console.log('Failed to load previous state'));


function App() {
    return (
        <Provider store={store}>
            <MyApp />
        </Provider>
    )
}

function MyApp() {
    return (
        <Router>
            <Switch>
                <Route path="/signIn" exact component={() => <LoginPage side={0} />} />
                <Route path="/signUp" exact component={() => <LoginPage side={2} />} />
                <Route path="/forgotPassword" exact component={() => <LoginPage side={1} />} />
                <MainRoute />
            </Switch>

        </Router>
    )
}

function MainRoute() {
    return (
        <>
            <NavBar />
            <ToastContainer style={{ marginTop: "80px" }} />
            <Switch>
                <Route path="/plugins/:id" exact component={Details} />
                <Route path="/admin" exact component={AdminPage} />
                <Route path="/user/profile" exact component={Profile} />
                <Route path="/user/plugins" exact component={UserPlugins} />
                <Route path="/user/cart" exact component={Cart} />
                <Route path="/" exact component={Plugins} />
                <Route path='*' exact={true} component={NotFound} />
            </Switch>
        </>
    )
}

export default App
