import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockedStore, mockedStoreEmpty } from '../../../fakes/reduxMock';
import Courses from '../Courses';

test('courses display not empty array of courses', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Courses />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryAllByText('title').length).toBe(2);
});

test('courses do not display empty array of courses', () => {
	render(
		<Provider store={mockedStoreEmpty}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Courses />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	expect(screen.queryAllByText('/title').length).toBe(0);
});

test('course form is shown after  click on Add new course button', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Courses />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	fireEvent.click(screen.getByRole('button', { name: 'Create course' }));

	expect(
		screen.queryAllByRole('button', { name: 'Create course' })
	).not.toBeNull();
});
