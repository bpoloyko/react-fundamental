import { url } from '../../services';
import { authorSaved } from './actionCreators';

export const authorSavedThunk = (token, name) => async (dispatch, getState) => {
	const request = await fetch(`${url}/authors/add`, {
		method: 'POST',
		body: JSON.stringify({ name }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	const response = await request.json();
	const result = response.result;

	dispatch(authorSaved(result));
};
