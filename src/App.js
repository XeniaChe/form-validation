import React, { useState } from 'react';
import Form from './components/form/Form';
import * as classes from './App.module.scss';

const App = () => {
	const formFieldsCreate = function(
		name,
		placeholder,
		type,
		required,
		needToCheck,
		isEmail
	) {
		this.basic = {
			name: name,
			placeholder: placeholder
		};
		this.type = type;
		this.value = '';
		this.validation = {
			required: required,
			needToCheck: needToCheck,
			isEmail: isEmail
		};
		this.isValid = false;
		this.touched = false;
	};

	const [ formState, setFormState ] = useState({
		formFields: {
			name: new formFieldsCreate(
				'First name',
				'Your first name',
				'text',
				false,
				false,
				false
			),
			password: new formFieldsCreate(
				'Password',
				'Insert your password',
				'password',
				true,
				false,
				false
			),
			passwordCheck: new formFieldsCreate(
				'Password checked',
				'Repeat your password',
				'password',
				true,
				true,
				false
			),
			email: new formFieldsCreate(
				'e-mail',
				'Insert your e-mail',
				'email',
				true,
				false,
				true
			)
		},
		formValid: false
	});
	const [ userInfo, setUserInfo ] = useState({
		name: '',
		password: '',
		passwordCheck: '',
		email: ''
	});

	const fieldValidCheck = (inputValue, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = inputValue.trim() !== '' && isValid;
		}

		if (rules.needToCheck) {
			isValid = inputValue === userInfo.password && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(inputValue) && isValid;
		}

		return isValid;
	};

	const onInputChangeHandler = (event, id) => {
		//Handling user's input
		let inputData = event.target.value;
		let userInfoCopy = { ...userInfo };
		userInfoCopy[id] = inputData;

		//Checking field's validation
		let fieldChecked = fieldValidCheck(
			inputData,
			formState.formFields[id].validation
		);
		let fieldsCopy = { ...formState.formFields };
		fieldsCopy[id].isValid = fieldChecked;
		fieldsCopy[id].touched = true;
		fieldsCopy[id].value = inputData;

		//Whole form's validation check
		let formIsValid = true;
		for (const field in fieldsCopy) {
			formIsValid = fieldsCopy[field].isValid && formIsValid;
		}

		// console.log('Form is Valid', formIsValid);
		setFormState({
			...formState,
			formFields: fieldsCopy,
			formValid: formIsValid
		});
		setUserInfo({ ...userInfoCopy });
	};

	const submitEventHandler = (event) => {
		event.preventDefault();

		if (formState.formValid) {
			try {
				const postData = async () => {
					let response = await fetch(
						'http://localhost:3000/usersData',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(userInfo)
						}
					);
					if (response.status === 201) {
						let data = await response.json();
						console.log("User's data:", data);
						alert('Your data was send successfully');
					} else {
						alert(
							"Your data wasn't sent. Status: " +
								response.statusText
						);
					}
				};
				postData();
				//cleaning userInfo state after submission
				let userInfoCopy = { ...userInfo };
				for (const key in userInfoCopy) {
					userInfoCopy[key] = '';
				}
				setUserInfo({
					...userInfoCopy
				});

				//cleaning input fields after submission
				let fieldsCopy = { ...formState.formFields };
				for (const key in fieldsCopy) {
					fieldsCopy[key].value = '';
				}
				setFormState({
					...formState,
					formFields: fieldsCopy,
					formValid: false
				});
			} catch (error) {
				alert('Error:' + error);
			}
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
