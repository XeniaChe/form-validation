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
