import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from '../services/fechApi';
import renderWithRouter from './helpers/renderWithRouter';
import { getUserLocalStorage } from '../services/functions';
import CardUser from '../components/CardUser';
import Admin from '../pages/Admin';

jest.mock('../services/functions');

jest.mock('../services/fechApi');

jest.mock('../components/Navbar', () => () => ({
  render: () => ('Navbar'),
}));

const allUsers = { data: [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  },
] };

test('Testa a presença dos elementos para registro na tela de admin', () => {
  getUserLocalStorage.mockReturnValue({ token: 'QualquerToken' });
  api.get.mockReturnValue(Promise.resolve(allUsers));
  renderWithRouter(<Admin />);
  const nameInput = screen.getByLabelText('Nome');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Senha');
  const roleSelect = screen.getByLabelText('Tipo');
  const registerBtn = screen.getByRole('button');
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(roleSelect).toBeInTheDocument();
  expect(registerBtn).toBeInTheDocument();
  expect(registerBtn).toBeDisabled();
});

test('testa tabela de administração de usuários', () => {
  render(allUsers.data.map((user) => (
    <CardUser
      key={ user.id }
      id={ user.id }
      name={ user.name }
      email={ user.email }
      role={ user.role }
      remove={ () => console.log('Remover') }
    />
  )));
  allUsers.data.forEach((user) => {
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.role)).toBeInTheDocument();
  });
  const removeBtns = screen.getAllByRole('button');
  expect(removeBtns.length).toBe(2);
  userEvent.click(removeBtns[0]);
});
