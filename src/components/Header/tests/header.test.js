import Header from '../Header';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockedStore } from '../../../fakes/reduxMock';

test('header is displayed with logo and username', () => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Header isLoggedIn={true} />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
	const logo = screen.getByRole('img');

	expect(screen.queryByText('Test Name')).toBeInTheDocument();
	expect(logo).toHaveAttribute('src', 'logo.png');
	expect(logo).toHaveAttribute('alt', 'Logo');
});
