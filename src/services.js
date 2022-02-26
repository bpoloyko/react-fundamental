import { useCallback, useEffect, useState } from 'react';

const url = 'http://localhost:3000';

export const useAuth = (method) => {
	const post = useCallback(
		async (data) => {
			const request = await fetch(`${url}/${method}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await request.json();
			return result;
		},
		[method]
	);

	return post;
};

export const useCourses = () => {
	const [coursesData, setCoursesData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		const fetchCourses = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const response = await fetch(`${url}/courses/all`);
				const requestResult = await response.json();
				setCoursesData(requestResult.result);
			} catch (e) {
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchCourses();
	}, []);

	return [coursesData, isLoading, isError];
};

export const useAuthors = () => {
	const [coursesData, setCoursesData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		const fetchCourses = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const response = await fetch(`${url}/authors/all`);
				const requestResult = await response.json();
				setCoursesData(requestResult.result);
			} catch (e) {
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchCourses();
	}, []);

	return [coursesData, isLoading, isError];
};
