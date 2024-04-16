import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TableOrder from '../components/TableOrder';
import { api } from '../services/fechApi';
import setToken, { getUserLocalStorage, serializeDate } from '../services/functions';
import { BoldText, DeliveryButton, DetailsContainer, MakeButton, StatusDetails,
  TitleDetails } from '../styles/OrderDetails';

function OrderDetailsSeller() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const saleId = pathname.replace('/seller/orders/', '');

  const [dataSale, setDataSales] = useState([]);
  const [status, setStatus] = useState('');

  console.log(dataSale);

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);

    const getSaleById = async () => {
      const { data } = await api.get(`/sale/${saleId}`);

      setDataSales(data);
      setStatus(data.status);
    };

    getSaleById();
  }, [navigate, saleId, status]);

  const updateStatus = async (newStatus) => {
    await api.put(`/sale/${saleId}`, { status: newStatus });
    setStatus(newStatus);
  };

  return (
    <div>
      <Navbar item2="PEDIDOS" />
      <TitleDetails>Detalhes do Pedido</TitleDetails>
      <DetailsContainer>
        <BoldText
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO ${dataSale.length !== 0 ? dataSale.id : ''}`}
        </BoldText>
        <BoldText
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {dataSale.length !== 0
            ? serializeDate(dataSale.saleDate) : ''}

        </BoldText>
        <StatusDetails
          data-testid="seller_order_details__element-order-details-label-delivery-status}"
        >
          {dataSale.length !== 0 ? dataSale.status : ''}
        </StatusDetails>
        <MakeButton
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ status !== 'Pendente' }
          onClick={ () => updateStatus('Preparando') }
        >
          PREPARAR PEDIDO
        </MakeButton>
        <DeliveryButton
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ status !== 'Preparando' }
          onClick={ () => updateStatus('Em Trânsito') }
        >
          SAIU PARA ENTREGA
        </DeliveryButton>
      </DetailsContainer>
      <div>
        <TableOrder isSale />
      </div>
    </div>
  );
}

export default OrderDetailsSeller;
