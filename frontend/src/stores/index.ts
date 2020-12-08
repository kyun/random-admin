import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './actions';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// ======== Compose redux dev tool with applyMiddleware ========
const saga = createSagaMiddleware();
const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(saga));
const store = createStore(reducers, enhancer);

saga.run(rootSaga);

export default store;
