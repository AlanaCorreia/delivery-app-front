import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TableOrder from '../components/TableOrder';
import Navbar from '../components/Navbar';
import { api } from '../services/fechApi';
import setToken, { getUserLocalStorage, serializeDate } from '../services/functions';
import { DetailsContainer, StatusDetails, BoldText,
  TitleDetails, DeliveryButton } from '../styles/OrderDetails';

function OrderDetailsCustomer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const saleId = pathname.replace('/customer/orders/', '');

  const stringStatus = 'status';

  const [dataSale, setDataSale] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);

    const getSaleById = async () => {
      const { data } = await api.get(`/sale/${saleId}`);

      setDataSale(data);
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
      <Navbar item1="PRODUTOS" item2="MEUS PEDIDOS" />
      <TitleDetails>Detalhes do Pedido</TitleDetails>
      <DetailsContainer>
        <BoldText
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO ${dataSale.length !== 0 ? dataSale.id : ''}`}
        </BoldText>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`P.Vend: ${dataSale.length !== 0 ? dataSale.seller.name : ''}`}
        </p>
        <BoldText
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {dataSale.length !== 0
            ? serializeDate(dataSale.saleDate) : ''}

        </BoldText>
        <StatusDetails
          data-testid={
            `customer_order_details__element-order-details-label-delivery-${stringStatus}`
          }
        >
          {dataSale.length !== 0 ? dataSale.status : ''}
        </StatusDetails>
        <DeliveryButton
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => updateStatus('Entregue') }
          disabled={ status !== 'Em Trânsito' }
        >
          MARCAR COMO ENTREGUE
        </DeliveryButton>
      </DetailsContainer>
      <div>
        <TableOrder />
      </div>
    </div>
  );
}

export default OrderDetailsCustomer;
