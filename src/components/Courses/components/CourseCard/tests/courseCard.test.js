import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockedStore, mockedAuthorsList } from '../../../../../fakes/reduxMock';
import CourseCard from '../CourseCard';

test('course card displays title', () => {
	const title = 'title';
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<CourseCard title={title} />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText(title)).toBeInTheDocument();
});

test('course card displays description', () => {
	const description = 'description';
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<CourseCard description={description} />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText(description)).toBeInTheDocument();
});

test('course card displays duration in correct format', () => {
	const duration = 100;
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<CourseCard duration={duration} />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText('01:40 hours')).toBeInTheDocument();
});

test('course card displays authors list', () => {
	const authorIds = [
		'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		'f762978b-61eb-4096-812b-ebde22838167',
	];

	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route
						path='*'
						element={
							<CourseCard allAuthors={mockedAuthorsList} authors={authorIds} />
						}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText('Vasiliy Dobkin, Nicolas Kim')).toBeInTheDocument();
});

test('course card displays created day', () => {
	const creationDate = '10/11/2020';

	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route
						path='*'
						element={<CourseCard creationDate={creationDate} />}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryByText(creationDate)).toBeInTheDocument();
});
