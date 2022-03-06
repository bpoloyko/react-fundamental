import { courses } from '../courses/reducer';

import { courseSaved, coursesLoaded } from '../courses/actionCreators';

test('should return the initial state', () => {
	expect(courses(undefined, {})).toEqual([]);
});

test('should handle a save course to an empty list', () => {
	const previousState = [];
	expect(courses(previousState, courseSaved({ title: 'new course' }))).toEqual([
		{
			title: 'new course',
		},
	]);
});

test('should handle a save course to a not empty list', () => {
	const previousState = [{ title: 'old course' }];
	expect(courses(previousState, courseSaved({ title: 'new course' }))).toEqual([
		{
			title: 'old course',
		},
		{
			title: 'new course',
		},
	]);
});

test('should handle a get courses', () => {
	const savedCourses = [{ title: 'title 1' }, { title: 'title 2' }];
	expect(courses(undefined, coursesLoaded(savedCourses))).toEqual(savedCourses);
});
