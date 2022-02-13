import React from 'react';

import { useParams, Link } from 'react-router-dom';

import Button from '../../common/Button/Button';

import { pipeDuration } from '../../helpers/pipeDuration';

import PropTypes from 'prop-types';

import './CourseInfo.css';

const CourseInfo = ({ courses, authors }) => {
	const { courseId } = useParams();
	const course = courses.find((course) => course.id === courseId);

	if (!course) {
		return (
			<div className='course-error'>
				<h1>No course found by id {courseId}</h1>
			</div>
		);
	}

	const courseAuthors = course.authors.map((id) => {
		return authors.find((author) => author.id === id)?.name;
	});

	return (
		<div className='course-info'>
			<Link to={'/courses'}>
				<Button buttonText='< Back to courses' />
			</Link>
			<h1 className='title'>{course.title}</h1>
			<div className='description'>{course.description}</div>
			<div className='info'>
				<div>
					<b>ID:</b> {course.id}
				</div>
				<div>
					<b>Duration:</b> {pipeDuration(course.duration)}
				</div>
				<div>
					<b>Created:</b> {course.creationDate}
				</div>
				<div>
					<b>Authors:</b> {courseAuthors.join(', ')}
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
};

export default CourseInfo;
