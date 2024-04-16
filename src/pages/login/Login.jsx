/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from 'logo-1.png';
import { MIN_LENGTH_PASSWORD } from '../../services/constants';
import signIn from '../../services/fechApi';
import { getUserLocalStorage, saveLocalStorage } from '../../services/functions';
import { Button, ErrorMessage, Form, FormContainer,
  Input, Label, Title } from '../../styles/Login';
import logo from '../../images/logo-2.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const emailRegex = /\S+@\S+\.+/;

  const btnIsValid = emailRegex.test(email) && password.length >= MIN_LENGTH_PASSWORD;

  const routeChange = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signIn(email, password);
    if (user) {
      saveLocalStorage(user);

      setError(false);

      if (user.role === 'administrator') return navigate('/admin/manage');
      if (user.role === 'seller') return navigate('/seller/orders');

      navigate('/customer/products');
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const loggedUser = getUserLocalStorage();

    if (loggedUser) return navigate('/customer/products');
  }, [navigate]);

  return (
    <FormContainer>
      <Form>
        <img src={ logo } alt="logo" />
        <Title>Login</Title>
        <Label htmlFor="email-input">
          Email
          <Input
            type="email"
            data-testid="common_login__input-email"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Label>
        <Label htmlFor="password-input">
          Password
          <Input
            id="password-input"
            type="password"
            data-testid="common_login__input-password"
            placeholder="******"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Label>
        <Button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ !btnIsValid }
          onClick={ handleSubmit }
        >
          LOGIN
        </Button>
        <Button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => routeChange() }
        >
          Ainda não tenho conta
        </Button>
        {error && (
          <ErrorMessage data-testid="common_login__element-invalid-email">
            ⚠️ Dados não cadastrados.
          </ErrorMessage>
        )}
      </Form>
    </FormContainer>
  );
}

export default Login;
