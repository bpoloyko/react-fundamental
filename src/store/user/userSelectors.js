import { createSelector } from '@reduxjs/toolkit';

export const selectUserName = (state) => state.user.name;

export const selectIsLoggedIn = (state) => state.user.isAuth;

export const selectUser = (state) => state.user;

export const selectIsAdminRole = createSelector(
	selectUser,
	(state) => state.role === 'admin'
);
