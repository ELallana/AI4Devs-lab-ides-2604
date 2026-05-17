import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders the main page with add button', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Add a new candidate/i)).toBeInTheDocument();
});

test('renders the candidate add form', () => {
  render(
    <MemoryRouter initialEntries={['/candidate-add']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Add a new candidate/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
});
