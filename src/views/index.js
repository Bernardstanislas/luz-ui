import {connect} from 'react-redux';
import React, {Component} from 'react';
import Login from './login';
import Main from './main';

const Container = props => {
    const {login} = props;
    if (!login.logged) return <Login {...props}/>;
    return <Main {...props}/>;
};

const select = ({login}) => {
    return {login};
}

export default connect(select)(Container);
