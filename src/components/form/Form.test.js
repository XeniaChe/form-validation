import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import Input from './Form';
import '@testing-library/jest-dom';

test('Submit button disabled when form is invalid', () => {
	const props = {
		form: {
			formFields: {
				name: {
					basic: {
						name: 'test name',
						placeholder: 'test placeholder'
					},
					type: 'input',
					value: 'value test',
					validation: {
						required: true,
						needToCheck: false,
						isEmail: false
					},
					isValid: false,
					touched: false
				}
			},
			formValid: false
		}
	};
	const component = render(<Form {...props} />);
	const button = component.container.querySelector('button');
	expect(button).toBeDisabled;
});
