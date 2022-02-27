import { createSelector } from '@reduxjs/toolkit';

export const selectCourses = (state) => state.courses;

export const searchCoursesByNameId = (search) =>
	createSelector(selectCourses, (courses) =>
		courses?.filter(
			(course) =>
				course.title.toLowerCase().includes(search.toLowerCase()) ||
				course.id.toLowerCase().includes(search.toLowerCase())
		)
	);

export const searchCoursesById = (id) =>
	createSelector(selectCourses, (courses) =>
		courses.find((course) => course.id.toLowerCase() === id)
	);
