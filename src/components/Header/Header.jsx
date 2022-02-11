import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';

const Header = (props) => {
	return (
		<div className='main-header'>
			<div className='logo'>
				<Logo />
			</div>
			<div className='logout-button'>
				<Button buttonText='Logout' />
			</div>
			<div className='username'>{props.userName}</div>
		</div>
	);
};

export default Header;
