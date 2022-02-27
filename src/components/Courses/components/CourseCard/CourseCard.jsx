import React from 'react';
import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { courseDeletedThunk } from '../../../../store/courses/thunk';
import { selectUser } from '../../../../store/user/userSelectors';

const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
	allAuthors,
	isAdmin,
}) => {
	const dispatch = useDispatch();
	const courseAuthors = authors?.map(
		(id) => allAuthors.find((author) => author.id === id)?.name
	);
	const token = useSelector(selectUser).token;
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
					{isAdmin && (
						<>
							<Link to={`/courses/update/${id}`}>
								<Button buttonText='Edit' />
							</Link>
							<Button
								buttonText='Delete'
								onClick={() => dispatch(courseDeletedThunk(token, id))}
							/>{' '}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default React.memo(CourseCard);
