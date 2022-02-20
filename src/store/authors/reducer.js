import { createReducer } from '@reduxjs/toolkit';

import { loadAuthors, saveAuthor } from './actionCreators';

const authorsInitialState = [];

export const authorsReducer = createReducer(authorsInitialState, (builder) => {
	builder
		.addCase(loadAuthors, (state, action) => {
			return action.payload;
		})
		.addCase(saveAuthor, (state, action) => {
			state.push(action.payload);
		});
});
