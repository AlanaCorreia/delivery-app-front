import styled from 'styled-components';
import { LIGTHER_GRAY2, REDDISH_BROWN } from './Colors';

const ContainerProducts = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax( 300px, 1fr));
    gap: 30px;

    max-width: 1366px;
    margin: 0 auto;
    margin-top: 5rem;

    padding-top: 40px;
    padding-bottom: 40px;


    .btn-car-shop {
        position: fixed;
        right: 50px;
        bottom: 50px;
        

        cursor: pointer;

        background-color: ${REDDISH_BROWN};
        color: ${LIGTHER_GRAY2};
        border: none;
        border-radius: 10px;
        padding: 20px 35px;

        font-size: 20px;
        font-weight: bold;
    }


`;

export default ContainerProducts;
