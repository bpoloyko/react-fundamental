import { combineReducers, createStore } from 'redux';

import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { loginLogoutMiddleware } from './user/userMiddlewares';

const middlewareEnhancer = applyMiddleware(loginLogoutMiddleware);

const composedEnhancer = compose(middlewareEnhancer, composeWithDevTools());

const rootReducer = combineReducers({
	userReducer,
	coursesReducer,
	authorsReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
