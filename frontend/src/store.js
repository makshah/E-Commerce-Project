import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {productListReducer, productDetailsReducer} from './reducer/productReducers'
import {cartReducer} from './reducer/cartReducers';
import Cookies from 'js-cookie';

const cartItems = Cookies.getJSON("cartItems") || [];

const initialState = {cart: {cartItems}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;