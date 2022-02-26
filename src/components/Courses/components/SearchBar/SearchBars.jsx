import React from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import PropTypes from 'prop-types';

const SearchBar = ({
	onChange,
	placeholderText,
	buttonText,
	onClick,
	value,
}) => {
	return (
		<>
			<Input
				placeholderText={placeholderText}
				onChange={onChange}
				value={value}
			/>
			<Button buttonText={buttonText} onClick={onClick} />
		</>
	);
};

SearchBar.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholderText: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default SearchBar;
