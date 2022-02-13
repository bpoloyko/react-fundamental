import { useCallback } from 'react';

const usePost = (url) => {
	const post = useCallback(
		async (data) => {
			const request = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await request.json();
			return result;
		},
		[url]
	);

	return post;
};

export default usePost;
