import { url } from '../../services';

import { courseDeleted, courseSaved, courseUpdated } from './actionCreators';

export const courseSavedThunk =
	(token, title, description, duration, authors) =>
	async (dispatch, getState) => {
		const request = await fetch(`${url}/courses/add`, {
			method: 'POST',
			body: JSON.stringify({
				title,
				description,
				duration,
				authors,
			}),
			headers: {
				'Content-Type': 'application/json',

				Authorization: token,
			},
		});
		const response = await request.json();
		const result = response.result;

		dispatch(courseSaved(result));
	};

export const courseDeletedThunk = (token, id) => async (dispatch, getState) => {
	const request = await fetch(`${url}/courses/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	dispatch(courseDeleted(id));
};

export const courseUpdatedThunk =
	(token, id, title, description, duration, authors) =>
	async (dispatch, getState) => {
		const request = await fetch(`${url}/courses/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title,
				description,
				duration,
				authors,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		const response = await request.json();
		const result = response.result;

		dispatch(courseUpdated(result));
	};
