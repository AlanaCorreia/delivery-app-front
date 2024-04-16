import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCarShopLocalStorage } from '../services/functions';
import setTotalSum from '../store/actions';
import { OrderContainer, RemoveButton, TableBody, TableContainer, TableHeader,
  TitleCheckout,
  TotalButton } from '../styles/TableOrders';

function TableOrder({ isCheckout, isSale }) {
  const dispatch = useDispatch();
  const dataTotalSum = useSelector(({ totalSum }) => totalSum);

  const CheckoutTitles = isCheckout ? [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ] : [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total',
  ];

  const [productsWithQtt, setProductsWithQtt] = useState([]);
  const [haveButton] = useState(isCheckout);

  const verifyDataTestId = (dataTest, index) => {
    if (isSale) {
      if (dataTest.includes('total-price')) return `seller_${dataTest}`;
      return `seller_${dataTest}-${index}`;
    }

    if (dataTest.includes('total-price')) return `customer_${dataTest}`;
    return `customer_${dataTest}-${index}`;
  };

  const totalCar = useCallback((productsLocalStorage) => {
    console.log(productsLocalStorage);
    if (productsLocalStorage.length !== 0) {
      const reduce = productsLocalStorage.reduce((acc, item) => {
        const totalValueProduct = item.quantity * Number(item.price);

        return acc + totalValueProduct;
      }, 0);

      dispatch(setTotalSum(reduce));

      return reduce;
    }

    dispatch(setTotalSum(0));
  }, [dispatch]);

  const updateLocalStorage = useCallback((idProduct, products) => {
    const newProducts = products.filter((item) => item.id !== idProduct);

    const productsWithQuant = newProducts
      .filter(({ quantity }) => quantity !== 0);

    totalCar(productsWithQuant);

    localStorage.setItem('carShop', JSON.stringify(productsWithQuant));

    setProductsWithQtt(productsWithQuant);
  }, [totalCar]);

  const handleRemoveProduct = useCallback((idCurr) => {
    const idNumber = Number(idCurr);

    const products = getCarShopLocalStorage();

    updateLocalStorage(idNumber, products);
  }, [updateLocalStorage]);

  useEffect(() => {
    const products = getCarShopLocalStorage();

    console.log(products);

    if (products) {
      totalCar(products);
    }

    return setProductsWithQtt(products);
  }, [totalCar]);

  return (
    <OrderContainer checkout={ isCheckout }>
      {isCheckout ? <TitleCheckout>Finalizar Pedido</TitleCheckout> : ''}
      <TableContainer>
        <TableHeader>
          <tr>
            {CheckoutTitles.map((title) => (
              <th key={ title }>{title}</th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {productsWithQtt?.map(({ id, name, price, quantity }, index) => (
            <tr key={ id }>
              <td
                data-testid={
                  isCheckout
                    ? `customer_checkout__element-order-table-item-number-${index}`
                    : (verifyDataTestId(
                      'order_details__element-order-table-item-number',
                      index,
                    ))
                }
              >
                {index + 1}
              </td>

              <td
                data-testid={
                  isCheckout
                    ? `customer_checkout__element-order-table-name-${index}`
                    : (verifyDataTestId(
                      'order_details__element-order-table-name',
                      index,
                    ))
                }
              >
                {name}
              </td>

              <td
                data-testid={
                  isCheckout
                    ? `customer_checkout__element-order-table-quantity-${index}`
                    : (verifyDataTestId(
                      'order_details__element-order-table-quantity',
                      index,
                    ))
                }
              >
                {quantity}
              </td>

              <td
                data-testid={
                  isCheckout
                    ? `customer_checkout__element-order-table-unit-price-${index}`
                    : (verifyDataTestId(
                      'order_details__element-order-table-unit-price',
                      index,
                    ))
                }
              >
                {Number(price).toFixed(2).replace('.', ',')}
              </td>

              <td
                data-testid={
                  isCheckout
                    ? `customer_checkout__element-order-table-sub-total-${index}`
                    : (verifyDataTestId(
                      'order_details__element-order-table-sub-total',
                      index,
                    ))
                }
              >
                {Number(price * quantity)
                  .toFixed(2)
                  .replace('.', ',')}
              </td>
              {haveButton && (
                <td>
                  <RemoveButton
                    type="button"
                    id={ id }
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ ({ target }) => handleRemoveProduct(target.id) }
                  >
                    Remover
                  </RemoveButton>
                </td>
              )}
            </tr>
          ))}
        </TableBody>
      </TableContainer>
      <TotalButton type="button" data-testid="customer_products__button-cart">
        Total: R$
        {' '}
        <span
          data-testid={
            isCheckout
              ? 'customer_checkout__element-order-total-price'
              : (verifyDataTestId(
                'order_details__element-order-total-price',
                null,
              ))
          }
        >
          {dataTotalSum.toFixed(2).replace('.', ',')}
        </span>
      </TotalButton>
    </OrderContainer>
  );
}

TableOrder.propTypes = {
  isCheckout: PropTypes.bool,
  isSale: PropTypes.bool,
}.isRequired;

export default TableOrder;
