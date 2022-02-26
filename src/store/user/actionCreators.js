import { createAction } from '@reduxjs/toolkit';

import { userActionTypes } from './actionTypes';

export const login = createAction(userActionTypes.LOGIN);
export const logout = createAction(userActionTypes.LOGOUT);
