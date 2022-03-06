import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser, selectIsAdminRole } from '../../store/user/userSelectors';

export const PrivateRouter = ({ children }) => {
	const isAdmin = useSelector(selectIsAdminRole);
	const user = useSelector(selectUser);
	return user?.isAuth ? (
		isAdmin ? (
			children
		) : (
			<Navigate to={'/courses'} />
		)
	) : (
		<Navigate to={'/login'} />
	);
};
