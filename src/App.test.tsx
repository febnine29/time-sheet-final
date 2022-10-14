import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  describe('divide function', () => {
    describe('when given to integers', () => {
      it('should return a division result', () => {
        const [a, b, expected] = [10, 2, 5];
        const result = a / b
        
        expect(result).toEqual(expected);
      })
    })
  })
});
