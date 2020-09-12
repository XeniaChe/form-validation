import React from 'react';

const Input = (props) => {
	console.log('Field is invalid', props.invalid);
	return (
		<div>
			<input
				id={props.id}
				type='text'
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onInput}
				required={props.required}
			/>
			<label htmlFor={props.id}>{props.name}</label>
		</div>
	);
};

export default Input;
