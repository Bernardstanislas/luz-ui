import {connect} from 'react-redux';
import React, {Component} from 'react';

import Scheduler from './scheduler';

import './style.scss';

const Container = props => (
    <div data-role='main'>
        <Scheduler {...props}/>
    </div>
);

const select = ({login, basePresence, relays, timesheets}) => {
    return {login, basePresence, relays, timesheets};
}

export default connect(select)(Container);
