import styled from 'styled-components';
import { InputsContainer, TitleDelivery } from './CheckoutForm';
import { BEIGE2, LIGHT_BROWN, LIGTHER_GRAY, LIGTH_GRAY, REDDISH_BROWN,
  YELLOW } from './Colors';
import { Status } from './OrderCard';

export const DetailsContainer = styled(InputsContainer)`
  align-items: center;
  background-color: ${BEIGE2};
  border: 1px solid ${LIGTHER_GRAY};
  border-radius: 3px;
  display: flex;
  justify-content: space-evenly;
  padding: 0.2rem;
  margin: 0.5rem auto;
  width: 90%;
`;

export const StatusDetails = styled(Status)`
  background-color: ${YELLOW};
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  margin: auto 5px;
  padding: 0.2em;
  width: 5.4rem;
`;

export const BoldText = styled.p`
  font-weight: bold;
`;

export const CheckButton = styled.button`
  background-color: ${LIGTHER_GRAY};
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
`;

export const MakeButton = styled(CheckButton)`
  background-color: ${LIGHT_BROWN};
  color: white;
  font-weight: bold;
`;

export const DeliveryButton = styled(MakeButton)`
  background-color: ${({ disabled }) => (disabled
    ? `${LIGTH_GRAY}` : `${REDDISH_BROWN}`)};
`;

export const TitleDetails = styled(TitleDelivery)`
  margin: 6rem 0 1rem 5.5rem;
`;
