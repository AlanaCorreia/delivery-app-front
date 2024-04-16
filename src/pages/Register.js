import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../services/constants';
import { api } from '../services/fechApi';
import { saveLocalStorage } from '../services/functions';
import { Button, ErrorMessage, Form, FormContainer, Input,
  Label, Title } from '../styles/Login';
import logo from '../images/logo-2.png';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/register', { name, email, password });

      saveLocalStorage(data);

      setName('');
      setEmail('');
      setPassword('');

      navigate('/customer/products');
    } catch (error) {
      console.log(error);
      setRegisterFailed(true);
    }
  };

  useEffect(() => {
    const validName = name.length >= MIN_LENGTH_NAME;
    const emailFormat = /\S+@\S+\.+/;
    const validEmail = emailFormat.test(email);
    const validPassword = password.length >= MIN_LENGTH_PASSWORD;

    if (validName && validEmail && validPassword) return setIsDisabled(false);

    return setIsDisabled(true);
  }, [email, name, password]);

  return (
    <FormContainer>
      <Form>
        <img src={ logo } alt="logo" />
        <Title>Cadastro</Title>
        <Label htmlFor="name-input">
          Nome
          <Input
            id="name-input"
            data-testid="common_register__input-name"
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            placeholder="Seu nome"
          />
        </Label>

        <Label htmlFor="email-input">
          Email
          <Input
            id="email-input"
            data-testid="common_register__input-email"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            placeholder="seu-email@site.com.br"
          />
        </Label>

        <Label htmlFor="password-input">
          Senha
          <Input
            id="password-input"
            data-testid="common_register__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="******"
          />
        </Label>

        <Button
          data-testid="common_register__button-register"
          type="button"
          onClick={ handleSubmit }
          disabled={ isDisabled }
        >
          CADASTRAR
        </Button>
        { registerFailed && (
          <ErrorMessage data-testid="common_register__element-invalid_register">
            ⚠️ Dados já cadastrados.
          </ErrorMessage>
        )}
      </Form>
    </FormContainer>
  );
}

export default Register;
