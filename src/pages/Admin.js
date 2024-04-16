import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../services/constants';
import { api } from '../services/fechApi';
import setToken, { getUserLocalStorage } from '../services/functions';
import CardUser from '../components/CardUser';
import { ContainerAdmin, ContainerForm, ContainerCardUser,
  TitleAdmin } from '../styles/AdminPage';

function Admin() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerFailed, setRegisterFailed] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [users, setUsers] = useState();

  const handleSubmit = async () => {
    try {
      console.log({ name, email, password, role });
      await api.post('/admin', { name, email, password, role });
      setRegisterSuccess(true);
    } catch (error) {
      console.log(error);

      setRegisterFailed(true);
    }
  };

  const getUsers = async () => {
    await api.get('/admin/users').then((response) => {
      setUsers(response.data);
    });
  };

  const remove = async (id) => {
    await api.delete(`/admin/users/${id}`);
    getUsers();
  };

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);
    getUsers();
  }, [navigate]);

  useEffect(() => {
    const validName = name.length >= MIN_LENGTH_NAME;
    const emailFormat = /\S+@\S+\.+/;
    const validEmail = emailFormat.test(email);
    const validPassword = password.length >= MIN_LENGTH_PASSWORD;
    const validRole = role !== undefined;

    if (validName && validEmail && validPassword && validRole) {
      return setIsDisabled(false);
    }

    return setIsDisabled(true);
  }, [email, name, password, role]);

  useEffect(() => {
    getUsers();
    setRegisterSuccess(false);
  }, [registerSuccess]);

  return (
    <ContainerAdmin>
      <Navbar item2="GERENCIAR USUÁRIOS" />
      <TitleAdmin>Cadastrar novo usuário</TitleAdmin>
      <ContainerForm>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            data-testid="admin_manage__input-name"
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email-input">
          Email
          <input
            id="email-input"
            data-testid="admin_manage__input-email"
            type="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            placeholder="seu-email@site.com.br"
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            id="password-input"
            data-testid="admin_manage__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="Senha"
          />
        </label>

        <label htmlFor="role-input">
          Tipo
          <select
            id="role-input"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>

        <button
          data-testid="admin_manage__button-register"
          type="button"
          onClick={ handleSubmit }
          disabled={ isDisabled }
        >
          CADASTRAR
        </button>
      </ContainerForm>
      { registerFailed ? (
        <p data-testid="admin_manage__element-invalid-register">
          Dados já cadastrados.
        </p>
      )
        : null }
      <TitleAdmin>Lista de usúarios</TitleAdmin>
      <ContainerCardUser>
        { users && users.map((user) => (
          <CardUser
            key={ user.id }
            id={ user.id }
            name={ user.name }
            email={ user.email }
            role={ user.role }
            remove={ remove }
          />
        ))}
      </ContainerCardUser>
    </ContainerAdmin>
  );
}

export default Admin;
