import {combineReducers} from 'redux';
import {ATTEMPT_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions';

const loggedIn = (state = false, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return action.authData;
        case LOGIN_FAILURE:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    loggedIn
});
