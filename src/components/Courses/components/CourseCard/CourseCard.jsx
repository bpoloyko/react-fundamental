import React from 'react';
import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { courseDeleted } from '../../../../store/courses/actionCreators';

import PropTypes from 'prop-types';

const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
	allAuthors,
}) => {
	const dispatch = useDispatch();
	const courseAuthors = authors?.map(
		(id) => allAuthors.find((author) => author.id === id)?.name
	);

	return (
		<div className='course-card'>
			<div className='main-info'>
				<h1>{title}</h1>
				<>{description}</>
			</div>
			<div className='additional-info'>
				<div className='authors'>
					<b>Authors:</b> {courseAuthors?.join(', ')}
				</div>
				<div>
					<b>Duration: </b> {pipeDuration(duration)}
				</div>
				<div>
					<b>Created:</b> {creationDate}
				</div>
				<div className='show-button'>
					<Link to={`/courses/${id}`}>
						<Button buttonText='Show course' />
					</Link>
					<Button buttonText='Edit' />
					<Button
						buttonText='Delete'
						onClick={() => dispatch(courseDeleted(id))}
					/>
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array,
};

export default React.memo(CourseCard);
