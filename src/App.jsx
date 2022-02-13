import { useState } from 'react/cjs/react.development';
import './App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { mockedCoursesList, mockedAuthorsList } from './constants';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

import { Routes, Route, Navigate } from 'react-router-dom';

import useUsername from './helpers/useUsername';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [isLoggedIn, setIsLoggedIn] = useState(
		Boolean(localStorage.getItem('token'))
	);

	const onCreateAuthorHandle = (author) => {
		if (
			!authors.find((existingAuthor) => author.name === existingAuthor.name)
		) {
			setAuthors([...authors, author]);
		}
	};

	const userName = useUsername(isLoggedIn);

	return (
		<>
			<Header
				className='header'
				userName={userName}
				isLoggedIn={isLoggedIn}
				onLogout={() => setIsLoggedIn(false)}
			/>
			<Routes>
				<Route exact path='/' element={<Navigate to='/login' />} />
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/login'
					element={<Login onLogin={() => setIsLoggedIn(true)} />}
				/>
				<Route
					path='/courses'
					exact
					element={<Courses courses={courses} authors={authors} />}
				/>
				<Route
					path='/courses/add'
					element={
						<CreateCourse
							authors={authors}
							onCreateAuthor={onCreateAuthorHandle}
							onCreateCourse={(course) => {
								setCourses([...courses, course]);
							}}
						/>
					}
				/>
				<Route
					path='/courses/:courseId'
					element={<CourseInfo courses={courses} authors={authors} />}
				/>
			</Routes>
		</>
	);
}

export default App;
