import { createAction } from '@reduxjs/toolkit';

import { authorsActionTypes } from './actionTypes';

export const loadAuthors = createAction(authorsActionTypes.LOAD);
export const saveAuthor = createAction(authorsActionTypes.SAVE);
