import KEY from './ReduxKeys'
import { combineReducers } from 'redux';


const initialTokenState = {
    user: undefined,
};

const loginReducer = (state = initialTokenState, action) => {
    switch (action.type) {
        // Increase Counter
        case KEY.LOGIN: {
            console.log("UPDATE USER ")
            return {
                // State
                ...state,
                // Redux Store
                user: action.value,
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

const initialCartState = {
    cart: [],
};

// Reducers (Modifies The State And Returns A New State)
const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case KEY.ADD_ITEM: {
            let newCart = state.cart;
            newCart.push(action.value);
            return {
                ...state,
                cart: newCart,
            }
        }

        case KEY.RESTORE: {
            return {
                ...state,
                cart: action.value,
            }
        }

        case KEY.REMOVE_ITEM: {
            let indexOfItem = state.cart.findIndex((el) => el._id === action.value);
            let newCart = state.cart;
            if (indexOfItem >= 0)
                newCart.splice(indexOfItem, 1);

            return {
                ...state,
                cart: newCart
            }
        }

        // Decrease Counter
        case KEY.REMOVE_ALL_ITEMS: {
            return {
                ...state,
                cart: [],
            }
        }

        default: {
            return state;
        }
    }
};


const rootReducer = combineReducers({
    tokenReducer: loginReducer,
    cartReducer: cartReducer,
});

export default rootReducer;
