import { useState } from 'react/cjs/react.development';
import './App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { useAuthors, useCourses } from './services';

import { Routes, Route, Navigate } from 'react-router-dom';

import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';

import { useDispatch } from 'react-redux';
import { coursesLoaded } from './store/courses/actionCreators';
import { authorsLoaded } from './store/authors/actionCreators';
import { selectIsLoggedIn } from './store/user/userSelectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { url } from './services';
import { login } from './store/user/actionCreators';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		useSelector(selectIsLoggedIn) || !!localStorage.getItem('token')
	);
	const [coursesData, coursesLoading, coursesError] = useCourses();
	const [authorsData, authorsLoading, authorsError] = useAuthors();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(coursesLoaded(coursesData));
		dispatch(authorsLoaded(authorsData));
	}, [authorsData, coursesData, dispatch]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!!token) {
			const fetchData = async () => {
				const request = await fetch(`${url}/users/me`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
				});
				const response = await request.json();
				const result = response.result;
				const user = {
					name: result.name || 'admin',
					email: result.email,
					token: token,
					role: result.role,
				};
				dispatch(login(user));
			};
			fetchData();
		}
	}, [dispatch]);

	return (
		<>
			<Header
				className='header'
				isLoggedIn={isLoggedIn}
				onLogout={() => setIsLoggedIn(false)}
			/>
			{(coursesLoading || authorsLoading) && <h1>Loading ...</h1>}
			{(coursesError || authorsError) && <h1>Error fetching data...</h1>}
			<Routes>
				<Route
					exact
					path='/'
					element={<Navigate to={isLoggedIn ? '/courses' : '/login'} />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/login'
					element={
						isLoggedIn ? (
							<Navigate to={'/courses'} />
						) : (
							<Login onLogin={() => setIsLoggedIn(true)} />
						)
					}
				/>
				<Route
					path='/courses'
					exact
					element={
						isLoggedIn ? (
							<Courses />
						) : (
							<Navigate to={isLoggedIn ? '/courses' : '/login'} />
						)
					}
				/>
				<Route
					path='/courses/add'
					element={
						<PrivateRouter>
							<CourseForm />
						</PrivateRouter>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRouter>
							<CourseForm isUpdate={true} />
						</PrivateRouter>
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</>
	);
}

export default App;
