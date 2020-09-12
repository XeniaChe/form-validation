import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as classes from './index.module.scss';
import * as serviceWorker from './serviceWorker';
import Input from './components/Input';

const App = () => {
	const formFieldsCreate = function(
		name,
		placeholder,
		required,
		needToCheck,
		isEmail
	) {
		this.basic = {
			name: name,
			placeholder: placeholder
		};
		// this.value = '';
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
				false,
				false,
				false
			),
			password: new formFieldsCreate(
				'Password',
				'Insert your password',
				true,
				false,
				false
			),
			passwordCheck: new formFieldsCreate(
				'Password checked',
				'Repeat your password',
				true,
				true,
				false
			),
			email: new formFieldsCreate(
				'e-mail',
				'Your e-mail',
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
	const [ submitState, setSubmit ] = useState({
		sending: false,
		submitted: false
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

		//Whole form's validation check
		let formIsValid = true;
		for (const field in fieldsCopy) {
			formIsValid = fieldsCopy[field].isValid && formIsValid;
		}

		// console.log('Form is Valid', formIsValid);
		setUserInfo({ ...userInfoCopy });
		setFormState({
			...formState,
			formFields: fieldsCopy,
			formValid: formIsValid
		});
	};

	const submitEventHandler = (event) => {
		event.preventDefault();

		if (formState.formValid) {
			setSubmit({
				...submitState,
				sending: true
			});
			fetch('http://localhost:3000/usersData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userInfo)
			})
				// .then((response) => response.json())
				.then((res) => console.log('success', res))
				.then(
					setSubmit({
						...submitState,
						submitted: true
					})
				)
				.catch(
					(error) => console.log(error)
					// setSubmit({
					// 	...submitState,
					// 	submitted: false
					// })
				);
		}

		// if (formState.formValid) {
		// 	try {
		// 		const postData = async () => {
		// 			const response = await fetch(
		// 				'http://localhost:3000/usersDat',
		// 				{
		// 					method: 'POST',
		// 					headers: {
		// 						'Content-Type': 'application/json'
		// 					},
		// 					body: JSON.stringify(userInfo)
		// 				}
		// 			);
		// 			const result = await response.json();
		// 			alert(result.message);
		// 		};
		// 		postData();
		// 	} catch (error) {
		// 		alert(error.message);
		// 	}
		// }
	};

	//Array from form.formfields object
	const fieldsArr = [];
	for (const key in formState.formFields) {
		fieldsArr.push({
			config: formState.formFields[key],
			id: key
		});
	}

	let form = (
		<div className={classes.formBox}>
			<h3>Insert your data</h3>
			<form action='#' id='form' onSubmit={submitEventHandler}>
				{fieldsArr.map((el) => (
					<Input
						id={el.id}
						key={el.id}
						name={el.config.basic.name}
						placeholder={el.config.basic.placeholder}
						onInput={(event) => onInputChangeHandler(event, el.id)}
						required={el.config.validation.required}
						invalid={!el.config.isValid}
						touched={el.config.touched}
					/>
				))}
				<button type='submit'>Submit</button>
			</form>
		</div>
	);

	return <div className={classes.App}>{form}</div>;
};

export default App;
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
