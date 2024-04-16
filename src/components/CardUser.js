import React from 'react';
import PropTypes from 'prop-types';
import ContainerCardAdmin from '../styles/CardUserAdmin';

function CardUser({ id, name, email, role, remove }) {
  return (
    <ContainerCardAdmin>
      <p
        className="card-size grow-0 color1"
        data-testid={ `admin_manage__element-user-table-item-number-${id}` }
      >
        {id}
      </p>
      <p
        className="card-size grow-1 color2"
        data-testid={ `admin_manage__element-user-table-name-${id}` }
      >
        {name}
      </p>
      <p
        className="card-size grow-1"
        data-testid={ `admin_manage__element-user-table-email-${id}` }
      >
        {email}
      </p>
      <p
        className="card-size grow-1"
        data-testid={ `admin_manage__element-user-table-role-${id}` }
      >
        {role}
      </p>
      <button
        data-testid={ `admin_manage__element-user-table-remove-${id}` }
        type="button"
        onClick={ () => remove(id) }
      >
        Excluir
      </button>
    </ContainerCardAdmin>
  );
}

CardUser.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CardUser;
