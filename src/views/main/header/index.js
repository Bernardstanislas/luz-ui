import React, {Component} from 'react';

import Clock from './clock';

import './style.scss';

const Header = () => (
    <div data-role='header'>
        <div data-role='title'>LUZ</div>
        <Clock/>
    </div>
);

export default Header;
