import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import PropTypes from 'prop-types';

import './Login.css';
import { useAuth } from '../../services';

import { useDispatch } from 'react-redux';

import { loginThunk } from '../../store/user/thunk';

const Login = ({ onLogin }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [loginUser, setLoginUser] = useState({ email: '', password: '' });

	const loginAPI = useAuth('login');

	const handleChange = (e) => {
		setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await loginAPI(loginUser);
		console.log('the user logged in');
		if (loginResponse.successful) {
			const token = loginResponse.result;
			console.log('login thunk called');
			dispatch(loginThunk(token));
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
