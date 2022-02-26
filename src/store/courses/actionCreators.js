import { createAction } from '@reduxjs/toolkit';

import { coursesActionTypes } from './actionTypes';

export const coursesLoaded = createAction(coursesActionTypes.LOAD);
export const courseSaved = createAction(coursesActionTypes.SAVE);
export const courseUpdated = createAction(coursesActionTypes.UPDATE);
export const courseDeleted = createAction(coursesActionTypes.DELETE);
