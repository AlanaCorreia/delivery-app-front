import styled from 'styled-components';
import { DARK_BROWN, GRAY, LIGHT_BROWN,
  MEDIUM_BROWN, REDDISH_BROWN, WHITE } from './Colors';

export const FormContainer = styled.div`
  align-items: center;
  background-image: url("cervejas.png");
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h1`
  color: ${DARK_BROWN};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const Form = styled.div`
  align-items: center;
  background-color: ${LIGHT_BROWN};
  border-radius: 0.2em;
  box-shadow: 3px 3px 10px ${GRAY};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  width: 20rem;

  img {
    margin-bottom: 5px;
    width: 10rem;
  }
`;

export const Label = styled.label`
  color: ${DARK_BROWN};
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const Input = styled.input`
  background-color: ${WHITE};
  border-radius: 5px;
  height: 2rem;
  margin: 0.4rem 0;
  outline: none;
  padding-left: 0.5rem;
  width: 15rem;
`;

export const Button = styled.button`
  background-color: ${MEDIUM_BROWN};
  border-radius: 5px;
  color: ${WHITE};
  font-weight: bold;
  height: 2rem;
  margin: 0.4em 0;
  width: 15.5rem;
`;

export const ErrorMessage = styled.p`
  color: ${REDDISH_BROWN};
  margin-top: 0.3rem;
`;

export const logoImg = styled.img`
  
`;
