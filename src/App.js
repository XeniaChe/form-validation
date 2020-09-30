import React, { useState, useEffect } from 'react';
import Form from './components/form/Form';
import * as classes from './App.module.scss';
import * as services from './services/utils';

const App = () => {
	const [ formState, setFormState ] = useState({
		formFields: {
			name: new services.formFieldsCreate(
				'First name',
				'Your first name',
				'text',
				false,
				false,
				false
			),
			password: new services.formFieldsCreate(
				'Password',
				'Insert your password',
				'password',
				true,
				false,
				false
			),
			passwordCheck: new services.formFieldsCreate(
				'Password checked',
				'Repeat your password',
				'password',
				true,
				true,
				false
			),
			email: new services.formFieldsCreate(
				'e-mail',
				'Insert your e-mail',
				'email',
				true,
				false,
				true
			)
		}
		// formValid: false
	});
	const [ userInfo, setUserInfo ] = useState({
		name: '',
		password: '',
		passwordCheck: '',
		email: ''
	});
	const [ fieldId, setFieldId ] = useState(null);

	const onInputChangeHandler = (event, id) => {
		let inputData = event.target.value;
		let userInfoCopy = { ...userInfo };
		userInfoCopy[id] = inputData;

		let fieldsCopy = { ...formState.formFields };
		fieldsCopy[id].touched = true;
		fieldsCopy[id].value = inputData;

		setFormState({
			...formState,
			formFields: fieldsCopy
		});

		setUserInfo({ ...userInfoCopy });
		setFieldId(id);
	};

	//setState Callback
	useEffect(
		() => {
			let fieldsCopy = { ...formState.formFields };
			if (fieldId && fieldsCopy[fieldId].value !== '') {
				fieldsCopy = services.fieldValidationOnID(
					formState.formFields,
					userInfo,
					fieldId
				);
			}

			setFormState((prevState) => {
				return {
					...prevState,
					formFields: fieldsCopy
				};
			});
		},
		[ userInfo, fieldId ]
	);

	const submitEventHandler = (event) => {
		event.preventDefault();
		// overall form validation check
		let formIsValid = services.formValidation(formState.formFields);

		if (formIsValid) {
			services.postData(userInfo);

			//cleaning userInfo state after submission
			let cleanedUserInfo = services.clearUserInfo(userInfo);
			setUserInfo({
				...cleanedUserInfo
			});

			//cleaning input fields after submission
			let cleanedFormFields = services.clearInputFields(
				formState.formFields
			);
			setFormState({
				...formState.formFields,
				formFields: cleanedFormFields
			});

			setFieldId(null);
		} else {
			console.log('Form is not validating');
		}
	};

	return (
		<div className={classes.App}>
			<Form
				form={formState}
				onInput={onInputChangeHandler}
				onSubmit={submitEventHandler}
			/>
		</div>
	);
};

export default App;
