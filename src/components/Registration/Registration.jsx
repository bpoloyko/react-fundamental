import React, { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

import './Registration.css';

const Registration = () => {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

	const register = async () => {
		const request = await fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await request.json();
		return result;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await register();

		if (response.successful) {
			navigate('/login');
		} else {
			alert(response.errors);
		}
	};

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	return (
		<div className='registration'>
			<div className='form'>
				<h2>Registration</h2>
				<form onSubmit={handleSubmit}>
					<Input
						name='name'
						labelText='Enter name'
						onChange={handleChange}
						value={newUser.name}
					/>
					<Input
						name='email'
						labelText='Enter email'
						onChange={handleChange}
						value={newUser.email}
					/>
					<Input
						name='password'
						labelText='Enter password'
						onChange={handleChange}
						value={newUser.password}
						type='password'
					/>
					<Button buttonText='Registartion' type='submit' />
				</form>
				<div>
					If you have an account you can {<Link to='/login'>Login</Link>}
				</div>
			</div>
		</div>
	);
};

export default Registration;
