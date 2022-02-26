import { createReducer } from '@reduxjs/toolkit';

import { authorsLoaded, authorSaved } from './actionCreators';

const authorsInitialState = [];

export const authors = createReducer(authorsInitialState, (builder) => {
	builder
		.addCase(authorsLoaded, (state, action) => {
			return action.payload;
		})
		.addCase(authorSaved, (state, action) => {
			state.push(action.payload);
		});
});
