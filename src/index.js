import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store';
import {Provider} from 'react-redux';
import Container from './views';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import './style/main.scss';

export const store = createStore();

const Main = props => !__DEV__ ? (
    <Provider store={store}>
        <Container {...props}/>
    </Provider>
) : (
    <div>
        <Provider store={store}>
            <Container {...props}/>
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>
);

ReactDOM.render(<Main/>, document.querySelector('.luz'));
