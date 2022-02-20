import { useState } from 'react/cjs/react.development';
import './App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { useAuthors, useCourses } from './services';

import { Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loadCourseList } from './store/courses/actionCreators';
import { loadAuthors } from './store/authors/actionCreators';
import { selectIsLoggedIn } from './store/user/userSelectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		useSelector(selectIsLoggedIn) || !!localStorage.getItem('token')
	);
	const [coursesData, coursesLoading, coursesError] = useCourses();
	const [authorsData, authorsLoading, authorsError] = useAuthors();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadCourseList(coursesData));
		dispatch(loadAuthors(authorsData));
	}, [authorsData, coursesData, dispatch]);

	if (coursesLoading || authorsLoading) {
		return <h1>Loading ...</h1>;
	}

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
						isLoggedIn ? (
							<CreateCourse />
						) : (
							<Navigate to={isLoggedIn ? '/courses' : '/login'} />
						)
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</>
	);
}

export default App;
