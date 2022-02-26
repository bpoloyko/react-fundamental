import { createReducer } from '@reduxjs/toolkit';

import {
	coursesLoaded,
	courseSaved,
	courseUpdated,
	courseDeleted,
} from './actionCreators';

const coursesInitialState = [];

export const courses = createReducer(coursesInitialState, (builder) => {
	builder
		.addCase(coursesLoaded, (state, action) => {
			return action.payload;
		})
		.addCase(courseSaved, (state, action) => {
			state.push(action.payload);
		})
		.addCase(courseUpdated, (state, action) => {
			let courseIndex = state.findIndex(
				(course) => course.id === action.payload.id
			);
			if (courseIndex > -1) {
				state[courseIndex] = { ...action.payload };
			}
		})
		.addCase(courseDeleted, (state, action) => {
			let courseIndex = state.findIndex(
				(course) => course.id === action.payload
			);
			if (courseIndex > -1) {
				state.splice(courseIndex, 1);
			}
		});
});
