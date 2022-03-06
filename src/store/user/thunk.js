import { url } from '../../services';

import { login, logout } from './actionCreators';

export const loginThunk = (token) => async (dispatch, getState) => {
	const request = await fetch(`${url}/users/me`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const response = await request.json();
	const result = response.result;
	const user = {
		name: result.name || 'admin',
		email: result.email,
		token: token,
		role: result.role,
	};
	console.log('login action dispatched');
	dispatch(login(user));
};

export const logoutThunk = (token) => async (dispatch, getState) => {
	const request = await fetch(`${url}/logout`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	dispatch(logout());
};
