import { combineReducers, createStore } from 'redux';

import { user } from './user/reducer';
import { courses } from './courses/reducer';
import { authors } from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { loginLogoutMiddleware } from './user/userMiddlewares';
import thunkMiddleware from 'redux-thunk';

const middlewares = [loginLogoutMiddleware, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const composedEnhancer = compose(middlewareEnhancer, composeWithDevTools());

const rootReducer = combineReducers({
	user,
	courses,
	authors,
});

export const store = createStore(rootReducer, composedEnhancer);
