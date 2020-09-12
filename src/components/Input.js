import React, { Fragment } from 'react';
import * as classes from './Input.module.scss';

const Input = (props) => {
	// console.log('Field is invalid', props.invalid);
	let style = [ classes.form_input ];
	let placeholder = props.placeholder;

	if (props.required) {
		style.push(classes.required);
		placeholder = placeholder + ' *';
	}

	let labelText = props.name;

	//Validation error handling
	if (props.invalid && props.touched) {
		style.push(classes.invalid);

		labelText = 'Please, input correct data';
		if (props.id === 'passwordCheck') {
			labelText = 'Please, repeat your password';
		}
	}
	let label = (
		<label className={classes.form_label} htmlFor={props.id}>
			{labelText}
		</label>
	);

	return (
		<Fragment>
			<div className={classes.form_group}>
				<input
					className={style.join(' ')}
					id={props.id}
					type='text'
					placeholder={placeholder}
					name={props.name}
					onChange={props.onInput}
					required={props.required}
				/>
				{label}
			</div>
		</Fragment>
	);
};

export default Input;
