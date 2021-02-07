import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import rootReducer from './root-reducer';
import userSaga from './user/user.sagas';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;


sagaMiddleware.run(userSaga);