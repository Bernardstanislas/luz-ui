import rootRef from '../firebase';

export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
        rootRef.authWithPassword({
            email,
            password
        }, (error, authData) => {
            if (error) {
                dispatch(loginFailure(error));
            } else {
                dispatch(loginSuccess(authData));
            }
        });
    }
};
