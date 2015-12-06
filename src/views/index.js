import {connect} from 'react-redux';
import React from 'react';
import Home from './home';

const Container = props => <Home {...props}/>;

const select = ({loggedIn}) => {
    return {loggedIn};
}

export default connect(select)(Container);
