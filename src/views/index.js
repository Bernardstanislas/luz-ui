import {connect} from 'react-redux';
import React, {Component} from 'react';

import Scheduler from './scheduler';

import './style.scss';

const Container = props => (
    <div data-role='main'>
        {props.login.loading && <h1>Logging in...</h1>}
        {!props.login.logged && props.login.error && <h1>Error while login in : {props.login.error.message}</h1>}
        {props.login.logged && <Scheduler {...props}/>}
    </div>
);

const select = ({login, basePresence, relays, timesheets, editingTimesheet}) => {
    return {login, basePresence, relays, timesheets, editingTimesheet};
}

export default connect(select)(Container);
