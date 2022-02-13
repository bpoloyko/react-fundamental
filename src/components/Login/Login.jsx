import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import PropTypes from 'prop-types';

import './Login.css';

const Login = ({ onLogin }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/courses');
		}
	});

	const [loginUser, setLoginUser] = useState({ email: '', password: '' });

	const login = async () => {
		const request = await fetch('http://localhost:3000/login', {
			method: 'POST',
			body: JSON.stringify(loginUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await request.json();
		return result;
	};

	const handleChange = (e) => {
		setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await login();

		if (response.successful) {
			localStorage.setItem('token', response.result);
			localStorage.setItem('username', response.user.name);
			onLogin();
			navigate('/courses');
		} else {
			alert(response.errors);
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
