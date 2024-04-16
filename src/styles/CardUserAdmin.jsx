import styled from 'styled-components';
import { MEDIUM_BROWN, LIGTHER_GRAY, REDDISH_BROWN } from './Colors';

const ContainerCardAdmin = styled.div`

    display: flex;
    align-items: center;
    align-content: stretch;
    
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 10px;

    background-color: ${MEDIUM_BROWN};

    button {
        border: none;
        height: 40px;
        padding: 0 10px;
        border-radius: 5px;
        background-color: ${REDDISH_BROWN};
        color: ${LIGTHER_GRAY};
        font-size: 1rem;
        cursor: pointer;
    }

    p {
        width: 20px;
        text-align: center;
        color: ${LIGTHER_GRAY}
    }

    .card-size{
        padding: 10px;
    }

    .grow-0 {
        flex-grow: 0;
    }

    .grow-1 {
        flex-grow: 1;
    }
`;

export default ContainerCardAdmin;
