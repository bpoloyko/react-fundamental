import React, { useState } from 'react';

import Button from '../../common/Button/Button';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBars';

import './Courses.css';

const Courses = ({ onAddNewCourseClick, courses, authors }) => {
	const [foundCourses, setFoundCourses] = useState(courses);
	const [searchString, setSearchString] = useState('');

	const searchCourse = (searchString) => {
		let foundCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(searchString.toLowerCase()) ||
				course.id.toLowerCase().includes(searchString.toLowerCase())
		);
		setFoundCourses(foundCourses);
	};

	return (
		<div className='courses-list'>
			<div className='header'>
				<div className='search-course'>
					<SearchBar
						buttonText='Search'
						placeholderText='Enter course name or id...'
						onClick={() => searchCourse(searchString)}
						onChange={(e) => {
							setSearchString(e.target.value);
							if (e.target.value === '') {
								setFoundCourses(courses);
							}
						}}
					/>
				</div>
				<div className='add-course-button'>
					<Button buttonText='Add new course' onClick={onAddNewCourseClick} />
				</div>
			</div>
			{foundCourses.map((course) => {
				return (
					<CourseCard
						key={course.id}
						course={course}
						authors={course.authors.map((id) => {
							return authors.find((author) => author.id === id)?.name;
						})}
					/>
				);
			})}
		</div>
	);
};

export default Courses;
