import {connect} from 'react-redux';
import React, {Component} from 'react';
import Login from './login';
import Main from './main';

const Container = props => {
    const {login} = props;
    if (!login.logged) {
        return <Login {...props}/>;
    } else {
        return <Main {...props}/>;
    }
};

const select = ({login, basePresence, relays}) => {
    return {login, basePresence, relays};
}

export default connect(select)(Container);
