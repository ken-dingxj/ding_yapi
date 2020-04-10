import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';

import promiseMiddleware from 'redux-promise';

const middleware = [promiseMiddleware];
let finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(reducer, {});

export default store;
