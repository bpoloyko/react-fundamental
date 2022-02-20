import { createAction } from '@reduxjs/toolkit';

import { coursesActionTypes } from './actionTypes';

export const loadCourseList = createAction(coursesActionTypes.LOAD);
export const saveCourse = createAction(coursesActionTypes.SAVE);
export const updateCourse = createAction(coursesActionTypes.UPDATE);
export const deleteCourse = createAction(coursesActionTypes.DELETE);
