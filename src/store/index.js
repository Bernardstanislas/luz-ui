import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from '../containers/dev-tools';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

console.log('Env', __DEV__ ? 'dev':'prod');

const createStoreWithMiddleware = __DEV__ ? compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
    DevTools.instrument()
) (createStore) : applyMiddleware(thunkMiddleware)(createStore);

export default function createReduxStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
