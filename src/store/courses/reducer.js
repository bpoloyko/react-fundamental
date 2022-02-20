import { createReducer } from '@reduxjs/toolkit';

import {
	loadCourseList,
	saveCourse,
	updateCourse,
	deleteCourse,
} from './actionCreators';

const coursesInitialState = [];

export const coursesReducer = createReducer(coursesInitialState, (builder) => {
	builder
		.addCase(loadCourseList, (state, action) => {
			return action.payload;
		})
		.addCase(saveCourse, (state, action) => {
			state.push(action.payload);
		})
		.addCase(updateCourse, (state, action) => {
			let course = state.find((course) => course.id === action.payload.id);
			if (course) {
				course = { ...action.payload };
			}
		})
		.addCase(deleteCourse, (state, action) => {
			let courseIndex = state.findIndex(
				(course) => course.id === action.payload
			);
			if (courseIndex > -1) {
				state.splice(courseIndex, 1);
			}
		});
});
