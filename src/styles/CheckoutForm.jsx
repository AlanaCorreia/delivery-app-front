import styled from 'styled-components';
import { LIGTHER_GRAY, BEIGE, RED } from './Colors';
// import { GRAY } from './Colors';
import { FormContainer, Input, Label } from './Login';
import { TitleCheckout, TotalButton } from './TableOrders';

export const DeliveryContainer = styled(FormContainer)`
  align-items: stretch;
  background-image: none;
  height: auto;
  justify-content: center;
  margin: 0.5rem auto;
  width: 90%;
`;

export const TitleDelivery = styled(TitleCheckout)`
  color: #43342f;
  font-size: 1.5rem;
  margin-left: 0.9rem;
`;

export const DeliveryForm = styled.form`
  align-items: center;
  border: 1px solid ${LIGTHER_GRAY};
  border-radius: 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1.4rem;
  padding: 0;
  width: 100%;
`;

export const InputsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  width: 100%;
`;

export const DeliveryLabel = styled(Label)`
  color: #43342f;
  margin: auto;
`;

export const DeliveryInput = styled(Input)`
  border: 1px solid ${LIGTHER_GRAY};
  color: #43342f;
  padding-left: 0.5rem;
  width: ${({ address }) => (address ? '30rem' : '15rem')};;
`;

export const DeliverySelect = styled.select`
  background-color: ${BEIGE};
  border-radius: 5px;
  height: 2rem;
  margin: 0.4rem 0;
  text-align-last:center;
`;

export const FinishButton = styled(TotalButton)`
  font-size: 1.3rem;
  height: 3rem;
  margin: 0.6em auto;
  width: 15.5rem;

  cursor: pointer;

  :hover {
    background-color: ${RED};
  }
`;
