import styled from 'styled-components';
import { LIGTHER_GRAY2, LIGTH_GRAY } from './Colors';

export const ContainerAdmin = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  margin-top: 6rem;

  h2 {
    margin-top: 2rem;
  }
`;

export const ContainerForm = styled.form`

  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 15px auto 30px;

  padding: 10px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;

    margin-right: 25px;

    input, select {
      border: none;
      border: 1px solid black;
      width: 100%;
      height: 40px;
      padding: 0 10px;
      margin-bottom: 10px;
      border-radius: 5px;
    }
  }

  button {
    border: none;
    height: 40px;
    margin-top: 20px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: green;
    color: ${LIGTHER_GRAY2};
    font-size: 1rem;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
    color: ${LIGTHER_GRAY2};
    cursor: not-allowed;
  }

`;

export const ContainerCardUser = styled.div`
  border: 1px solid ${LIGTH_GRAY};
  border-radius: 5px;
  margin-top: 5px;

  padding: 15px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

`;

export const TitleAdmin = styled.h1`
  color: #43342f;
  font-size: 1.5rem;
  margin: 1rem 0 1rem;
`;
