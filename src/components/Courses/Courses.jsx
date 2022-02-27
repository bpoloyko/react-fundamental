import React, { useState, useMemo } from 'react';

import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBars';

import './Courses.css';

import { useSelector } from 'react-redux';
import { selectAuthors } from '../../store/authors/authorsSelectors';
import { searchCoursesByNameId } from '../../store/courses/coursesSelectors';
import { selectUser } from '../../store/user/userSelectors';

const Courses = () => {
	const authors = useSelector(selectAuthors);
	const [searchString, setSearchString] = useState('');
	const [inputValue, setInputValue] = useState('');
	const foundCourses = useSelector(searchCoursesByNameId(searchString));
	const isAdmin = useSelector(selectUser).role === 'admin';
	const coursesToRender = useMemo(
		() =>
			foundCourses.map((course) => {
				return (
					<CourseCard
						key={course.id}
						{...course}
						allAuthors={authors}
						isAdmin={isAdmin}
					/>
				);
			}),
		[foundCourses, authors, isAdmin]
	);

	return (
		<div className='courses-list'>
			<div className='header'>
				<div className='search-course'>
					<SearchBar
						buttonText='Search'
						placeholderText='Enter course name or id...'
						value={inputValue}
						onClick={() => setSearchString(inputValue)}
						onChange={(e) => {
							const value = e.target.value;
							if (value === '') {
								setSearchString(value);
							}
							setInputValue(value);
						}}
					/>
				</div>
				{isAdmin && (
					<div className='add-course-button'>
						<Link to='/courses/add'>
							<button type='button'>Create course</button>
						</Link>
					</div>
				)}
			</div>
			{coursesToRender}
		</div>
	);
};

export default Courses;
