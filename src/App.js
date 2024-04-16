import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/login/Login';
import OrderDetailsCustomer from './pages/OrderDetailsCustomer';
import OrderDetailsSeller from './pages/OrderDetailsSeller';
import OrdersCustomer from './pages/OrdersCustomer';
import OrdersSeller from './pages/OrdersSeller';
import ProductsCustomer from './pages/ProductsCustomer';
import Register from './pages/Register';
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <ProductsCustomer /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetailsCustomer /> } />
      <Route exact path="/customer/orders" element={ <OrdersCustomer /> } />
      <Route exact path="/seller/orders" element={ <OrdersSeller /> } />
      <Route exact path="/seller/orders/:id" element={ <OrderDetailsSeller /> } />
      <Route exact path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

export default App;
