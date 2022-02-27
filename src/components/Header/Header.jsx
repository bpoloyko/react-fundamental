import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../store/user/thunk';
import { selectUser, selectUserName } from '../../store/user/userSelectors';

const Header = ({ onLogout, isLoggedIn }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userName =
		useSelector(selectUserName) || localStorage.getItem('username');
	const token = useSelector(selectUser).token;

	const handleLogout = () => {
		dispatch(logoutThunk(token));
		onLogout();
		navigate('/login');
	};

	return (
		<div className='main-header'>
			<div className='logo'>
				<Logo />
			</div>
			{isLoggedIn && (
				<>
					<div className='logout-button'>
						<Button buttonText='Logout' onClick={handleLogout} />
					</div>
					<div className='username'>{userName}</div>
				</>
			)}
		</div>
	);
};

Header.propTypes = {
	userName: PropTypes.string,
	onLogout: PropTypes.func,
	isLoggedIn: PropTypes.bool,
};

export default Header;
