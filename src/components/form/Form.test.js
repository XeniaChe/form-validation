import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

test('test input onChange event', () => {
	const props = {
		form: {
			formFields: {
				name: {
					basic: {
						name: 'test name',
						placeholder: 'test placeholder'
					},
					type: 'input',
					value: '',
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
	const onChangeMock = jest.fn();
	const component = render(<Input onChange={onChangeMock} {...props} />);
	const input = component.container.querySelector('input');
	fireEvent.change(input, { target: { value: 'val' } });

	expect(input.value).toBe('val');
});
