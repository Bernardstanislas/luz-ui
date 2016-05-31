import forEach from 'lodash/forEach';

import rootRef, {presenceRef, relaysRef, timesheetsRef} from '../firebase';

export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const UPDATE_BASE_PRESENCE = 'UPDATE_BASE_PRESENCE';
export const UPDATE_RELAY = 'UPDATE_RELAY';

export const UPDATE_TIMESHEETS = 'UPDATE_TIMESHEETS';

export const EDIT_TIMESHEET = 'EDIT_TIMESHEET';

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginFailure = (error) => {
    return ({
        type: LOGIN_FAILURE,
        error
    });
};

const loginSuccess = (authData) => {
    return ({
        type: LOGIN_SUCCESS,
        authData
    });
};

export const attemptLogin = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        rootRef.authWithPassword({
            email,
            password
        }, (error, authData) => {
            if (error) {
                dispatch(loginFailure(error));
            } else {
                presenceRef.on('value', snapshot => {
                    dispatch(updateBasePresence(snapshot.val()));
                });
                relaysRef.on('value', snapshot => {
                    const relays = snapshot.val();
                    forEach(relays, ({manual, switched}, relayId) => {
                        // if (!manual) { // Check if the change was triggered by the user (no update then) or by a schedule
                            dispatch(updateRelay(relayId, switched));
                        // }
                    });
                });
                timesheetsRef.on('value', snapshot => {
                    const rawTimesheets = snapshot.val() || {};
                    const flattenTimesheet = (rawTimesheet = {}) => Object.keys(rawTimesheet).map(id => ({
                        id,
                        ...(rawTimesheet[id])
                    }));
                    dispatch(updateTimesheets({
                        relay1: flattenTimesheet(rawTimesheets.relay1),
                        relay2: flattenTimesheet(rawTimesheets.relay2)
                    }));
                });
                dispatch(loginSuccess(authData));
            }
        });
    }
};

export const updateBasePresence = presence => ({
    type: UPDATE_BASE_PRESENCE,
    presence
});

export const updateRelay = (relayId, switched) => ({
    type: UPDATE_RELAY,
    relayId,
    switched
});

export const updateTimesheets = timesheets => ({
    type: UPDATE_TIMESHEETS,
    timesheets
});

export const editTimesheet = (relayId, timesheetId, from, to, active) => ({
    type: EDIT_TIMESHEET,
    relayId,
    timesheetId,
    from,
    to,
    active
});
