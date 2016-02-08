import {forEach} from 'lodash/collection';

import rootRef, {presenceRef, relaysRef} from '../firebase';

export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const UPDATE_BASE_PRESENCE = 'UPDATE_BASE_PRESENCE';
export const UPDATE_RELAY = 'UPDATE_RELAY';

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
                        if (!manual) {
                            dispatch(updateRelay(relayId, switched));
                        }
                    });
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
