// action - state management
import * as actionTypes from './actions';

const initialState = {
    isLoggedIn: false,
    userId: '',
    emailAddress: '',
    accessToken: ''
};

// ==============================|| SNACKBAR REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn ? action.isLoggedIn : initialState.isLoggedIn,
                userId: action.userId ? action.userId : initialState.userId,
                emailAddress: action.emailAddress ? action.emailAddress : initialState.emailAddress,
                accessToken: action.accessToken ? action.accessToken : initialState.accessToken
            };
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                isLoggedIn: false,
                emailAddress: '',
                userId: ''
            };
        }
        default:
            return state;
    }
};

export default userReducer;
