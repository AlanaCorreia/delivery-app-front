import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/fechApi';
import CardSalesProduct from '../components/CardSalesProducts';
import Navbar from '../components/Navbar';
import setToken, { getUserLocalStorage, serializeDate } from '../services/functions';
import ContainerOrderSaller from '../styles/OrderSeller';
import { OrderContainer } from '../styles/OrderCard';

function OrdersSeller() {
  const navigate = useNavigate();

  const [sallers, setSellers] = useState();

  console.log(sallers);

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);

    api.get('/sale/seller').then((response) => {
      setSellers(response.data);
    });
  }, [navigate]);

  return (
    <ContainerOrderSaller>
      <Navbar item1="PRODUTOS" item2="MEUS PEDIDOS" />
      <OrderContainer>
        {sallers && sallers.map((sale) => (
          <CardSalesProduct
            key={ sale.id }
            id={ sale.id }
            price={ sale.totalPrice }
            address={ sale.deliveryAddress }
            number={ sale.deliveryNumber }
            date={ serializeDate(sale.saleDate) }
            status={ sale.status }
            isSale
          />
        ))}
      </OrderContainer>
    </ContainerOrderSaller>
  );
}

export default OrdersSeller;
