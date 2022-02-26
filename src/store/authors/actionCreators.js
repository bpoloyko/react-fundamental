import { createAction } from '@reduxjs/toolkit';

import { authorsActionTypes } from './actionTypes';

export const authorsLoaded = createAction(authorsActionTypes.LOAD);
export const authorSaved = createAction(authorsActionTypes.SAVE);
