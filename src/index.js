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
		isCorrect,
		isEmail
	) {
		this.basic = {
			name: name,
			placeholder: placeholder
		};
		this.value = '';
		this.validation = {
			required: required,
			isCorrect: isCorrect,
			isEmail: isEmail
		};
	};
	const [ formState, setFormState ] = useState({
		formFields: {
			name: new formFieldsCreate(
				'Firs name',
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
			repeatPassword: new formFieldsCreate(
				'Password check',
				'Repeat your password',
				true,
				false,
				false
			),
			email: new formFieldsCreate(
				'Email',
				'Your email',
				true,
				false,
				false
			)
		},
		formValid: false
	});
	const [ userInfo, setUserInfo ] = useState({
		name: '',
		password: '',
		passwordRepeat: false,
		eMail: ''
	});

	const fieldsArr = [];
	for (const key in formState.formFields) {
		fieldsArr.push({
			config: formState.formFields[key],
			id: key
		});
	}

	const onInputChangeHandler = (event, id) => {
		let inputData = event.target.value;
		let userInfoCopy = { ...userInfo };
		console.log(userInfo);
		userInfoCopy[id] = inputData;
		setUserInfo({ ...userInfoCopy });
	};

	let form = (
		<form action='#' id='form'>
			{fieldsArr.map((el) => (
				<Input
					id={el.id}
					key={el.id}
					name={el.config.basic.name}
					placeholder={el.config.basic.placeholder}
					onInput={(event) => onInputChangeHandler(event, el.id)}
				/>
			))}
		</form>
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
