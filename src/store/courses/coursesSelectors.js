import { createSelector } from '@reduxjs/toolkit';

export const selectCourses = (state) => state.coursesReducer;

export const searchCoursesById = (id) =>
	createSelector(selectCourses, (courses) =>
		courses.find((course) => course.id.toLowerCase() === id)
	);
