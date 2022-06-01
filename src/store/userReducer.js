// action - state management
import * as actionTypes from './actions';

const initialState = {
    isLoggedIn: true,
    userId: '',
    emailAddress: '',
    userName: '',
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
                userName: action.userName ? action.userName : initialState.userName,
                accessToken: action.accessToken ? action.accessToken : initialState.accessToken
            };
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                isLoggedIn: false,
                emailAddress: '',
                userName: '',
                userId: '',
                accessToken: ''
            };
        }
        default:
            return state;
    }
};

export default userReducer;
