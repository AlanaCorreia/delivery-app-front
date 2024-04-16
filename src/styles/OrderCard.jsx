import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BEIGE, LIGTHER_GRAY2, LIGTH_GRAY, REDDISH_BROWN, YELLOW } from './Colors';

export const OrderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  margin: 3rem auto;
  width: 80%;
  
`;

export const LinkCard = styled(Link)`
  align-items: center;
  background-color: ${REDDISH_BROWN};
  color: ${LIGTHER_GRAY2};
  border-radius: 5px;
  box-shadow: 3px 3px 10px ${LIGTH_GRAY};
  display: flex;
  flex-direction: column;
  height: 14rem;
  justify-content: space-evenly;
  margin: 1rem;
  padding-top: 0.5rem;
  width: 22rem;
  text-decoration: none;

  .address {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const OrderNumber = styled.div`
  align-items: center;
  align-content: stretch;
  display: flex;
  justify-content: space-evenly;

  font-size: 1.7rem;

  margin-bottom: 8px;
  width: 15rem;

  span {
    font-weight: bold;
  }
`;

export const StatusContainer = styled.div`
  align-items: center;
  background-color: ${LIGTHER_GRAY2};
  color: #342723;
  
  display: flex;
  justify-content: space-evenly;
  padding: 0.6em 0;
  width: 100%;
`;

export const ColumnContainer = styled.div`
  align-items: center;
  align-content: stretch;
  display: flex;
  flex-direction: column; 
  justify-content: space-evenly;

  font-size: 1.7rem;
  margin-bottom: 8px;

`;

export const Status = styled.p`
  background-color: ${YELLOW};
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: bold;
  margin: auto 5px;
  padding: 0.8em;
`;

export const TextOrder = styled(Status)`
  background-color: ${BEIGE};
  font-size: 1.2rem;
  margin: 5px;
  padding: 0.3em;
`;
