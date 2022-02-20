import { useCallback, useEffect, useState } from 'react';

const url = 'http://localhost:3000';

export const useLogin = () => {
	const post = useCallback(async (data) => {
		const request = await fetch(`${url}/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await request.json();
		return result;
	}, []);

	return post;
};

export const useRegister = () => {
	const post = useCallback(async (data) => {
		const request = await fetch(`${url}/register`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await request.json();
		return result;
	}, []);

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
				const requestResult = await fetch(`${url}/courses/all`).then(
					(response) => {
						return response.json();
					}
				);

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
				const requestResult = await fetch(`${url}/authors/all`).then(
					(response) => {
						return response.json();
					}
				);

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
