import rootRef from '../firebase';

export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
                dispatch(loginSuccess(authData));
            }
        });
    }
};
