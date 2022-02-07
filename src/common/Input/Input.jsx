import React from 'react';

const Input = ({
	type = 'text',
	value,
	min,
	labelText,
	placeholderText,
	onChange,
	isTextArea,
	inputRef,
	name,
}) => {
	return (
		<>
			{labelText && <label htmlFor='inputTextId'>{labelText}</label>}
			{isTextArea ? (
				<textarea
					type={type}
					value={value}
					min={min}
					ref={inputRef}
					name={name}
					onChange={onChange}
					placeholder={placeholderText}
					id='inputTextId'
				/>
			) : (
				<input
					type={type}
					min={min}
					value={value}
					name={name}
					ref={inputRef}
					onChange={onChange}
					placeholder={placeholderText}
					id='inputTextId'
				/>
			)}
		</>
	);
};

export default Input;
