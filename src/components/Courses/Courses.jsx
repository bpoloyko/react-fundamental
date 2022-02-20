import React, { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBars';

import './Courses.css';

import { useSelector } from 'react-redux';
import { selectAuthors } from '../../store/authors/authorsSelectors';
import { selectCourses } from '../../store/courses/coursesSelectors';

const Courses = () => {
	const authors = useSelector(selectAuthors);
	const courses = useSelector(selectCourses);
	const [foundCourses, setFoundCourses] = useState(courses);
	const [searchString, setSearchString] = useState('');

	const coursesToRender = useMemo(
		() =>
			foundCourses.map((course) => {
				return (
					<CourseCard
						key={course.id}
						course={course}
						authors={course.authors?.map((id) => {
							return authors.find((author) => author.id === id)?.name;
						})}
					/>
				);
			}),
		[foundCourses, authors]
	);

	const searchCourse = useCallback(() => {
		const foundCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(searchString.toLowerCase()) ||
				course.id.toLowerCase().includes(searchString.toLowerCase())
		);
		setFoundCourses(foundCourses);
	}, [searchString, courses]);

	return (
		<div className='courses-list'>
			<div className='header'>
				<div className='search-course'>
					<SearchBar
						buttonText='Search'
						placeholderText='Enter course name or id...'
						onClick={searchCourse}
						onChange={(e) => {
							setSearchString(e.target.value);
							if (e.target.value === '') {
								setFoundCourses(courses);
							}
						}}
					/>
				</div>
				<div className='add-course-button'>
					<Link to='/courses/add'>
						<button type='button'>Create course</button>
					</Link>
				</div>
			</div>
			{coursesToRender}
		</div>
	);
};

export default Courses;
