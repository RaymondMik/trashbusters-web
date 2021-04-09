import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from "./sagas";


const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];
let store: any;
// add logger middleware in development only
if (process.env.NODE_ENV === 'development') middlewares.push(loggerMiddleware);

/**
 * Initialize the store
 * @returns {Object} Redux store.
 */
const initStore = () => {
	store = createStore(
		rootReducer,
		composeWithDevTools(
			applyMiddleware(...middlewares)
		)
	);

	// Webpack Hot Module Replacement API - runs only in development
	// @ts-ignore
	if (process.env.NODE_ENV === 'development' && module.hot) {
		// @ts-ignore
		module.hot.accept('./reducers', () => {
		  const nextReducers = require('./reducers').default;
		  store.replaceReducer(nextReducers);
		});
	}

	sagaMiddleware.run(rootSaga)

	return store;
};

export { initStore, store };
