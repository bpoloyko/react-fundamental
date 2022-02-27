import React from 'react';

import { Navigate } from 'react-router-dom';

export const PrivateRouter = ({ children, user }) => {
	return user?.isAuth ? (
		user.role === 'admin' ? (
			children
		) : (
			<Navigate to={'/courses'} />
		)
	) : (
		<Navigate to={'/login'} />
	);
};
