import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
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
				'Password check',
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

	//Array from form.formfields object
	const fieldsArr = [];
	for (const key in formState.formFields) {
		fieldsArr.push({
			config: formState.formFields[key],
			id: key
		});
	}

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

		//Whole form's validation check
		let formIsValid = true;
		for (const field in fieldsCopy) {
			formIsValid = fieldsCopy[field].isValid && formIsValid;
		}

		console.log('Form is Valid', formIsValid);
		setUserInfo({ ...userInfoCopy });
		setFormState({
			...formState,
			formFields: fieldsCopy
		});
	};

	let form = (
		<div>
			<form action='#' id='form'>
				{fieldsArr.map((el) => (
					<Input
						id={el.id}
						key={el.id}
						name={el.config.basic.name}
						placeholder={el.config.basic.placeholder}
						onInput={(event) => onInputChangeHandler(event, el.id)}
						required={el.config.validation.required}
						invalid={!el.config.isValid}
					/>
				))}
			</form>
			<button>Submit</button>
		</div>
	);

	return (
		<div className='App'>
			<h2>form-validation</h2>
			{form}
		</div>
	);
};

export default App;
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
