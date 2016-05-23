import {combineReducers} from 'redux';
import {ATTEMPT_LOGIN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, UPDATE_BASE_PRESENCE, UPDATE_RELAY, UPDATE_TIMESHEETS, EDIT_TIMESHEET} from '../actions';

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

const basePresence = (state = false, action) => {
    switch(action.type) {
        case UPDATE_BASE_PRESENCE:
            return action.presence;
        default:
            return state;
    }
};

const relays = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_RELAY:
            return {...state, [action.relayId]: action.switched};
        default:
            return state;
    }
};

const timesheets = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TIMESHEETS:
            return action.timesheets;
        default:
            return state;
    }
};

const editingTimesheet = (state = null, action) => {
    switch (action.type) {
        case EDIT_TIMESHEET:
            return action.timesheetId;
        default:
            return state;
    }
}

export default combineReducers({
    login, basePresence, relays, timesheets
});
