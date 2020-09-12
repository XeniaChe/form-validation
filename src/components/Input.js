import React from 'react';

const Input = (props) => {
	return (
		<div>
			<input
				id={props.id}
				type='text'
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onInput}
			/>
			<label htmlFor={props.id}>{props.name}</label>
		</div>
	);
};

export default Input;
