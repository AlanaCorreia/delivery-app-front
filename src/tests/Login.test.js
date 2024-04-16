import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import signIn from '../services/fechApi';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

jest.mock('../services/fechApi');
jest.mock('../pages/ProductsCustomer', () => () => ({
  render: () => ('CustomerPage'),
}));
jest.mock('../pages/Register', () => () => ({
  render: () => ('RegisterPage'),
}));

const userDataMock = {
  name: 'Delivery App Admin',
  email: 'zebirita@email.com',
  role: 'customer',
  token: 'any_valid_token',
};

const userMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

test('Verifica a existência do campo de Email na página de Login', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByRole('textbox', { type: 'email' });
  expect(inputEmail).toBeInTheDocument();
});

test('Verifica a existência do campo de Email na página de Login', () => {
  renderWithRouter(<App />);
  const inputPassword = screen.getByRole('textbox', { type: 'password' });
  expect(inputPassword).toBeInTheDocument();
});

test('Verifica o botão de Login na página de Login', () => {
  renderWithRouter(<App />);
  const loginBtn = screen.getByRole('button', { name: /LOGIN/i });
  expect(loginBtn).toBeInTheDocument();
  expect(loginBtn).toHaveProperty('type', 'submit');
  expect(loginBtn).toBeDisabled();
});

test('Verifica o botão de Login após digitar dados válidos nos campos', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByRole('textbox', { type: 'email' });
  const inputPassword = screen.getByLabelText('Password');
  userEvent.type(inputEmail, userMock.email);
  userEvent.type(inputPassword, userMock.password);
  const loginBtn = screen.getByRole('button', { name: /LOGIN/i });
  expect(loginBtn).toBeEnabled();
});

test('Verifica o botão de cadastro', () => {
  renderWithRouter(<App />);
  const registerBtn = screen.getByRole('button', { name: /Ainda não tenho conta/i });
  expect(registerBtn).toBeInTheDocument();
  expect(registerBtn).toHaveProperty('type', 'button');
});

test('Verifica o redirecionamento ao logar como administrator', async () => {
  renderWithRouter(<App />);
  signIn.mockReturnValue(Promise.resolve(userDataMock));
  const inputEmail = screen.getByRole('textbox', { type: 'email' });
  const inputPassword = screen.getByLabelText('Password');
  userEvent.type(inputEmail, userMock.email);
  userEvent.type(inputPassword, userMock.password);
  const loginBtn = screen.getByRole('button', { name: /LOGIN/i });
  userEvent.click(loginBtn);
  await Promise.resolve();
  expect(screen.getByText('CustomerPage')).toBeInTheDocument();
});
