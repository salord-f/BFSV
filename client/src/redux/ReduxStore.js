import { LOGIN_KEY } from './ReduxKeys'
import { combineReducers } from 'redux';


const initialTokenState = {
    token: "",
};

const loginReducer = (state = initialTokenState, action) => {
    switch (action.type) {
        // Increase Counter
        case LOGIN_KEY: {
            return {
                // State
                ...state,
                // Redux Store
                token: action.value,
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

const initialCounterState = {
    counter: 0,
};

// Reducers (Modifies The State And Returns A New State)
const counterReducer = (state = initialCounterState, action) => {
    switch (action.type) {
        // Increase Counter
        case 'INCREASE_COUNTER': {
            return {
                // State
                ...state,
                // Redux Store
                counter: state.counter + 1,
            }
        }

        // Decrease Counter
        case 'DECREASE_COUNTER': {
            return {
                // State
                ...state,
                // Redux Store
                counter: state.counter - 1,
            }
        }

        // Default
        default: {
            return state;
        }
    }
};


const rootReducer = combineReducers({
    tokenReducer: loginReducer,
    counterReducer: counterReducer,
});

export default rootReducer;