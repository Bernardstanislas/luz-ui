import {combineReducers} from 'redux';
import {ATTEMPT_LOGIN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions';

const login = (state = {logged: false, error: null, loading: false}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {...state, loading: true};
        case LOGIN_SUCCESS:
            return {logged: true, error: null, authData: action.authData, loading: false};
        case LOGIN_FAILURE:
            return {logged: false, error: action.error, authData: false, loading: false};
        default:
            return state;
    }
};

export default combineReducers({
    login
});
