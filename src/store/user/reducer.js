import { createReducer } from '@reduxjs/toolkit';

import { login, logout } from './actionCreators';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const user = createReducer(userInitialState, (builder) => {
	builder
		.addCase(login, (state, action) => {
			return {
				...action.payload,
				isAuth: true,
			};
		})
		.addCase(logout, (state) => (state = userInitialState));
});
