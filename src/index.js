import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import {Provider} from 'react-redux';
import Container from './views';

import DevTools from './containers/dev-tools';

import {attemptLogin} from './actions';
import secret from './secret';


import './style/main.scss';

export const store = createStore();

store.dispatch(attemptLogin(secret.get('EMAIL'), secret.get('PASSWORD')));

const Main = props => !__DEV__ ? (
    <Provider store={store}>
        <Container {...props}/>
    </Provider>
) : (
    <Provider store={store}>
        <div>
            <Container {...props}/>
            <DevTools />
        </div>
    </Provider>
);

ReactDOM.render(<Main/>, document.querySelector('.luz'));
