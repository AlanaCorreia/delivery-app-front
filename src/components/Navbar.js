import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage, getUserLocalStorage } from '../services/functions';
import { NavButton, NavContainer, NavLink, NavName } from '../styles/Navbar';

function Navbar({ item1, item2, item3 }) {
  const navigate = useNavigate();
  const dataUser = getUserLocalStorage();

  console.log(dataUser.role);

  const handleLogout = () => {
    clearLocalStorage();

    navigate('/');
  };

  return (
    <NavContainer>

      <NavLink
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        { item1 }
      </NavLink>
      <NavLink
        to={ dataUser.role === 'customer' ? '/customer/orders' : '/seller/orders' }
        data-testid="customer_products__element-navbar-link-orders"
      >
        { item2 }
      </NavLink>
      <NavLink to="/">{ item3 }</NavLink>
      <NavName data-testid="customer_products__element-navbar-user-full-name">
        { dataUser.name }
      </NavName>
      <NavButton
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleLogout }
      >
        Sair
      </NavButton>
    </NavContainer>
  );
}

Navbar.propTypes = {
  item1: PropTypes.string,
  item2: PropTypes.string.isRequired,
  item3: PropTypes.string,
};

Navbar.defaultProps = {
  item1: '',
  item3: '',
};

export default Navbar;
