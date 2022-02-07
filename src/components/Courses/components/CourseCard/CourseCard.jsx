import React from 'react';
import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

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
					<Button buttonText='Show course' />
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
