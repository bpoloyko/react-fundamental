import { userActionTypes } from './actionTypes';

export const loginLogoutMiddleware = (storeAPI) => (next) => (action) => {
	if (action.type === userActionTypes.LOGOUT) {
		localStorage.clear();
	}
	if (action.type === userActionTypes.LOGIN) {
		localStorage.setItem('token', action.payload.token);
		localStorage.setItem('username', action.payload.name);
	}

	return next(action);
};
