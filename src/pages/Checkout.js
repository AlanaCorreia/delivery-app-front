import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutDelivery from '../components/CheckoutDelivery';
import TableOrder from '../components/TableOrder';
import Navbar from '../components/Navbar';
import setToken, { getUserLocalStorage } from '../services/functions';

function Checkout() {
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);
  }, [navigate]);

  return (
    <div>
      <Navbar item1="PRODUTOS" item2="MEUS PEDIDOS" />
      <TableOrder isCheckout />
      <CheckoutDelivery />
    </div>
  );
}

export default Checkout;
