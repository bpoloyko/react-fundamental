import React from 'react';
import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const CourseCard = ({ course, authors }) => {
	return (
		<div className='course-card'>
			<div className='main-info'>
				<h1>{course.title}</h1>
				<>{course.description}</>
			</div>
			<div className='additional-info'>
				<div className='authors'>
					<b>Authors:</b> {authors.join(', ')}
				</div>
				<div>
					<b>Duration: </b> {pipeDuration(course.duration)}
				</div>
				<div>
					<b>Created:</b> {course.creationDate}
				</div>
				<div className='show-button'>
					<Link to={`/courses/${course.id}`}>
						<Button buttonText='Show course' />
					</Link>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};

export default CourseCard;
