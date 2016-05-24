import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

import Wheel from './wheel';

const Scheduler = props => (
    <div data-role='scheduler'>
        <Wheel {...props}/>
    </div>
);

export default Scheduler;
