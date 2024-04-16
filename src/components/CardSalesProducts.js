import React from 'react';
import PropTypes from 'prop-types';
import { ColumnContainer, LinkCard,
  StatusContainer, Status, TextOrder, OrderNumber } from '../styles/OrderCard';

function CardSalesProduct({ price, status, date, id, address, number, isSale }) {
  return (
    <LinkCard to={ `/${isSale ? 'seller' : 'customer'}/orders/${id}` }>
      <OrderNumber>
        Pedido
        {' '}
        <span
          data-testid={ `${
            isSale ? 'seller' : 'customer'}_orders__element-order-id-${id}` }
        >
          {id}
        </span>
      </OrderNumber>

      <StatusContainer>
        <Status
          data-testid={ `${
            isSale ? 'seller' : 'customer'}_orders__element-delivery-status-${id}` }
        >
          {status}
        </Status>

        <ColumnContainer>
          <TextOrder>
            R$
            {' '}
            <span
              data-testid={ `${
                isSale ? 'seller' : 'customer'}_orders__element-card-price-${id}` }
            >
              {Number(price).toFixed(2).replace('.', ',')}
            </span>
          </TextOrder>
          <TextOrder
            data-testid={ `${
              isSale ? 'seller' : 'customer'}_orders__element-order-date-${id}` }
          >
            {date}
          </TextOrder>
        </ColumnContainer>
      </StatusContainer>
      <div className="address">
        {address && number && (
          <p
            data-testid={ `seller_orders__element-card-address-${id}` }
          >
            {`${address}, ${number}`}
          </p>
        )}
      </div>
    </LinkCard>
  );
}

CardSalesProduct.propTypes = {
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  address: PropTypes.string,
  number: PropTypes.string,
  isSale: PropTypes.bool.isRequired,

};

CardSalesProduct.defaultProps = {
  address: '',
  number: '',
};

export default CardSalesProduct;
