import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('checks required fields', () => {
	const { getAllByTestId } = render(<App />);
	const inputArr = getAllByTestId('input');
	expect(inputArr[0]).not.toBeRequired();
	expect(inputArr[3]).toBeRequired();
	expect(inputArr.length).toBe(4);

	// const
});
