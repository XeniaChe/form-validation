export const formFieldsCreate = function(
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

//SINGLE FIELD VALIDATION CHECK
export const fieldValidCheck = (inputValue, rules, userInfo) => {
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

// setState CALLBACK
export const fieldValidationOnID = (fields, userInfo, id) => {
	let fieldsCopy = { ...fields };
	console.log(id + 'field check');

	let fieldChecked = fieldValidCheck(
		userInfo[id],
		fields[id].validation,
		userInfo
	);
	fieldsCopy[id].isValid = fieldChecked;

	return fieldsCopy;
};

//OVERALL FORM VALIDATION
export const formValidation = (fields) => {
	let formIsValid = true;
	for (const key in fields) {
		formIsValid = fields[key].isValid && formIsValid;
	}
	return formIsValid;
};

//POSTING DATA TO SERVER
export const postData = async (userInfo) => {
	try {
		let response = await fetch('http://localhost:3001/usersData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		});
		if (response.status === 201) {
			let data = await response.json();
			console.log("User's data:", data);
			alert('Your data was send successfully');
		} else {
			alert(
				"We'\re sorry. Your data wasn't sent. Status: " +
					response.statusText
			);
		}
	} catch (error) {
		console.log(error);
		alert("We're sorry ((..  An error: " + error.message + ' occured');
	}
};

//CLEANING INPUT FILEDS AFTER SUBMIT
export const clearInputFields = (fields) => {
	let fieldsCopy = { ...fields };
	for (const key in fieldsCopy) {
		fieldsCopy[key].value = '';
	}
	return fieldsCopy;
};

export const clearUserInfo = (userInfo) => {
	let userInfoCopy = { ...userInfo };
	for (const key in userInfoCopy) {
		userInfoCopy[key] = '';
	}
	return userInfoCopy;
};
