import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import PropTypes from 'prop-types';

import './Login.css';
import usePost from '../../helpers/usePost';

const Login = ({ onLogin }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/courses');
		}
	});

	const [loginUser, setLoginUser] = useState({ email: '', password: '' });

	const login = usePost('http://localhost:3000/login');

	const handleChange = (e) => {
		setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await login(loginUser);

		if (loginResponse.successful) {
			localStorage.setItem('token', loginResponse.result);
			localStorage.setItem('username', loginResponse.user.name);
			onLogin();
			navigate('/courses');
		} else {
			alert(loginResponse.errors);
		}
	};

	return (
		<div className='login'>
			<div className='form'>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<Input
						name='email'
						labelText='Enter email'
						onChange={handleChange}
						value={loginUser.email || ''}
					/>
					<Input
						name='password'
						type='password'
						labelText='Enter password'
						onChange={handleChange}
						value={loginUser.password || ''}
					/>
					<Button buttonText='Login' />
				</form>
				<div>
					If you do not have an account you can{' '}
					{<Link to='/registration'>Registration</Link>}
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default Login;
