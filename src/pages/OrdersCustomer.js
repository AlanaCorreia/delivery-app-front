import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSalesProduct from '../components/CardSalesProducts';
import Navbar from '../components/Navbar';
import { api } from '../services/fechApi';
import setToken, { getUserLocalStorage, serializeDate } from '../services/functions';
import { OrderContainer } from '../styles/OrderCard';
import ContainerOrderSaller from '../styles/OrderSeller';

function OrdersCustomer() {
  const navigate = useNavigate();

  const [dataSale, setDataSale] = useState([]);

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);

    const getSales = async () => {
      const { data } = await api.get('/sale/customer');

      setDataSale(data);
    };

    getSales();
  }, [navigate]);

  return (
    <ContainerOrderSaller>
      <Navbar item1="PRODUTOS" item2="MEUS PEDIDOS" />
      <OrderContainer>
        {dataSale && (
          dataSale.map((sale) => (
            <CardSalesProduct
              key={ sale.id }
              id={ sale.id }
              price={ sale.totalPrice }
              status={ sale.status }
              date={ serializeDate(sale.saleDate) }
              isSale={ false }
            />
          ))
        )}
      </OrderContainer>
    </ContainerOrderSaller>
  );
}

export default OrdersCustomer;
