import React, { useState, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import moment from 'moment';

import { pipeDuration } from '../../helpers/pipeDuration';

import { useNavigate, useParams } from 'react-router-dom';

import { selectUser } from '../../store/user/userSelectors';
import { useDispatch } from 'react-redux';
import {
	courseSavedThunk,
	courseUpdatedThunk,
} from '../../store/courses/thunk';
import { selectAuthors } from '../../store/authors/authorsSelectors';
import { searchCoursesById } from '../../store/courses/coursesSelectors';
import { useSelector } from 'react-redux';

import './CourseForm.css';
import { authorSavedThunk } from '../../store/authors/thunk';

const mapAuthorsFromId = (allAuthors, authorIds) => {
	return authorIds.map((id) => allAuthors.find((a) => a.id === id));
};

const CourseForm = ({ isUpdate }) => {
	const authors = useSelector(selectAuthors);
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const courseToUpdate = useSelector(searchCoursesById(courseId));
	const user = useSelector(selectUser);

	const [courseAuthors, setCourseAuthors] = useState(
		isUpdate ? mapAuthorsFromId(authors, courseToUpdate.authors) : []
	);
	const [formData, setFormData] = useState(
		isUpdate
			? { ...courseToUpdate }
			: { title: '', description: '', duration: 0 }
	);
	const navigate = useNavigate();

	const inputAuthorName = useRef('');

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onCreateAuthorClick = () => {
		const newAuthorName = inputAuthorName.current.value;
		if (
			newAuthorName?.length &&
			!authors.find((existingAuthor) => newAuthorName === existingAuthor.name)
		) {
			dispatch(authorSavedThunk(user.token, newAuthorName));
		}
	};

	const onAddAuthorClick = (author) => {
		let courseAuthorNames = courseAuthors.map((author) => author.name);
		if (!courseAuthorNames.find((authorName) => author.name === authorName)) {
			setCourseAuthors([...courseAuthors, author]);
		}
	};

	const onDeleteAuthorClick = (author) => {
		let deleteAuthor = courseAuthors.filter((auth) => auth.id !== author.id);
		setCourseAuthors(deleteAuthor);
	};

	const validateForm = (...args) => {
		if (args.some((elem) => !elem?.length)) {
			alert('Please, fill all fields');
			return false;
		}

		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isValid = validateForm(
			formData.title,
			formData.description,
			formData.duration.toString(),
			courseAuthors
		);

		if (isValid) {
			const newCourse = {
				id: formData.id || uuidv4(),
				creationDate: moment(new Date()).format('DD/MM/YYYY'),
				description: formData.description,
				title: formData.title,
				duration: formData.duration.toString(),
				authors: courseAuthors?.map((author) => author.id),
			};
			isUpdate
				? dispatch(
						courseUpdatedThunk(
							user.token,
							courseId,
							newCourse.title,
							newCourse.description,
							Number.parseInt(newCourse.duration),
							newCourse.authors
						)
				  )
				: dispatch(
						courseSavedThunk(
							user.token,
							newCourse.title,
							newCourse.description,
							Number.parseInt(newCourse.duration),
							newCourse.authors
						)
				  );
			navigate('/courses');
		}
	};

	return (
		<div className='create-course'>
			<form onSubmit={onSubmit}>
				<div className='header'>
					<div className='title-input'>
						<Input
							labelText='Title'
							name='title'
							placeholderText='Enter title...'
							onChange={handleInputChange}
							value={formData.title}
						/>
					</div>
					<Button
						type='submit'
						buttonText={isUpdate ? 'Update course' : 'Create course'}
					/>
				</div>

				<div className='description-input'>
					<Input
						name='description'
						labelText='Description'
						isTextArea={true}
						placeholderText='Enter description'
						onChange={handleInputChange}
						value={formData.description}
					/>
				</div>

				<div className='duration-input'>
					<h2>Duration</h2>
					<Input
						type='number'
						min='1'
						name='duration'
						labelText='Duration'
						placeholderText='Enter duration in minutes'
						value={formData.duration}
						onChange={handleInputChange}
					/>
					<h1>Duration: {pipeDuration(formData.duration)}</h1>
				</div>
			</form>
			<div className='authors-input'>
				<div className='create-author'>
					<h2>Add author</h2>
					<Input
						inputRef={inputAuthorName}
						labelText='Author name'
						placeholderText='Enter author name...'
					/>
					<Button buttonText='Create Author' onClick={onCreateAuthorClick} />
				</div>
				<div className='authors'>
					<b>Authors</b>
					{authors?.map((author) => {
						return (
							<div key={author.id} className='author'>
								<div className='author-name'>{author.name}</div>
								<div className='author-buttons'>
									<Button
										buttonText='Add author'
										onClick={() => onAddAuthorClick(author)}
									/>
									<Button
										buttonText='Delete author'
										onClick={() => onDeleteAuthorClick(author)}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className='course-authors'>
					<h2>Course authors</h2>
					{!courseAuthors?.length && <h3>Author list is empty</h3>}
					{courseAuthors?.map((author) => author.name).join(', ')}
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
