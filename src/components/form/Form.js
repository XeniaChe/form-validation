import React, { Fragment } from 'react';
import * as classes from './Form.module.scss';

const Input = (props) => {
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

		props.id !== 'passwordCheck'
			? (labelText = 'Please, input correct data')
			: (labelText = 'Passwords should match');
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
					type={props.type}
					placeholder={placeholder}
					name={props.name}
					onChange={props.onInput}
					required={props.required}
					value={props.value}
				/>
				{label}
			</div>
		</Fragment>
	);
};

const Form = (props) => {
	//Array from form.formfields object
	const fieldsArr = [];
	for (const key in props.form.formFields) {
		fieldsArr.push({
			config: props.form.formFields[key],
			id: key
		});
	}
	return (
		<div className={classes.formBox}>
			<h3>Insert your data</h3>
			<form action='#' id='form' onSubmit={props.onSubmit}>
				{fieldsArr.map((el) => (
					<Input
						id={el.id}
						key={el.id}
						name={el.config.basic.name}
						type={el.config.type}
						value={el.config.value}
						placeholder={el.config.basic.placeholder}
						onInput={(event) => props.onInput(event, el.id)}
						required={el.config.validation.required}
						invalid={!el.config.isValid}
						touched={el.config.touched}
					/>
				))}
				<button type='submit' disabled={!props.form.formValid}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
