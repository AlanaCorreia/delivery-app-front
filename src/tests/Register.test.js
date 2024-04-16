import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from '../services/fechApi';
import renderWithRouter from './helpers/renderWithRouter';
import Register from '../pages/Register';

const userMock = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

jest.mock('../services/fechApi');

jest.mock('../pages/ProductsCustomer', () => () => ({
  render: () => ('CustomerPage'),
}));

test('Testa os elementos da página de registro', () => {
  renderWithRouter(<Register />);
  const nameInput = screen.getByLabelText('Nome');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Senha');
  const registerBtn = screen.getByRole('button');
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(registerBtn).toBeInTheDocument();
  expect(registerBtn).toBeDisabled();
});

test('Testa se o botão de registro é habilitado', async () => {
  renderWithRouter(<Register />);
  api.post.mockReturnValue(Promise.resolve({ data: userMock }));
  const nameInput = screen.getByLabelText('Nome');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Senha');
  userEvent.type(nameInput, userMock.name);
  userEvent.type(emailInput, userMock.email);
  userEvent.type(passwordInput, userMock.password);
  const registerBtn = screen.getByRole('button');
  expect(registerBtn).toBeEnabled();
  userEvent.click(registerBtn);
  await Promise.resolve();
});
