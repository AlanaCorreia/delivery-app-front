import styled from 'styled-components';
import { MEDIUM_BROWN, LIGTHER_GRAY2, REDDISH_BROWN } from './Colors';

const CardProduct = styled.div`

    position: relative;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;


    .card-product--img{
        width: 100%;
        height: auto;

        img{
            width: 100%;
            height: 283px;
        }
    }

    .card-product--price{
        position: absolute;
        left: 0px;
        top: 0px;

        border: 1px solid black;
        border-radius: 5px;
        padding: 6px;
        border: none;

        background-color: ${REDDISH_BROWN};
        color: ${LIGTHER_GRAY2};

        font-size: 18px;
    }

    .footer-card-product{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        background-color: ${MEDIUM_BROWN};

        p {
            color: ${LIGTHER_GRAY2};
            font-size: 15px;

            padding:  10px 0 0 0;
        }

        button {
            padding: 0 10px;
            cursor: pointer;
        }

        .button-right {
           border-radius: 0px 5px 5px 0px;
        }

        .button-left {
            border-radius: 5px 0px 0px 5px;
        }


        .card-product--btns {

            display: flex;
            justify-content: center;
            padding: 1rem;


            input{
                width: 20%;
                margin: 0;
                text-align: center;

            }

            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            }

            
        }
    }

`;

export default CardProduct;
