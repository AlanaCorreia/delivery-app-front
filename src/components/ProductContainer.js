import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import setTotalSum from '../store/actions';
import { getProductsLocalStorage } from '../services/functions';
import CardProduct from '../styles/CardProduct';

function ProductContainer({ product }) {
  const { id, name, price, urlImage } = product;

  const dispatch = useDispatch();

  const getQuantity = () => {
    const getLocalStorage = getProductsLocalStorage();
    const productCurr = getLocalStorage
      .find((item) => item.id === Number(id)).quantity || 0;

    return productCurr;
  };

  const [quantity, setQuantity] = useState(() => getQuantity());

  const totalCar = useCallback(async (productsLocalStorage) => {
    if (productsLocalStorage.length !== 0) {
      const reduce = await productsLocalStorage.reduce((acc, item) => {
        const totalValueProduct = item.quantity * Number(item.price);

        return acc + totalValueProduct;
      }, 0);

      dispatch(setTotalSum(reduce));

      return reduce;
    }
  }, [dispatch]);

  const updateLocalStorage = useCallback(async (CurrQtt, idProduct, products) => {
    if (CurrQtt < 0) setQuantity(0);

    const newProducts = await products.map((item) => {
      if (item.id === idProduct) {
        return {
          ...item,
          quantity: CurrQtt,
        };
      }

      return item;
    });

    totalCar(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  }, [totalCar]);

  const changeQuantity = useCallback((action, idCurr, value = 0) => {
    const idNumber = Number(idCurr);

    const products = getProductsLocalStorage();

    const updateQtt = () => {
      const productLocalStorage = products.find((item) => item.id === idNumber);
      const { quantity: productQuantity } = productLocalStorage;
      const productQt = Number(productQuantity);

      if (action === 'set') return value < 0 ? 0 : Number(value);

      if (action === 'decrease') {
        return productQt > 0 ? (productQt - 1) : 0;
      }

      return productQt + 1;
    };

    const newQtt = updateQtt();

    updateLocalStorage(newQtt, idNumber, products);
    setQuantity(newQtt);
  }, [updateLocalStorage]);

  useEffect(() => {
    const products = getProductsLocalStorage();

    return totalCar(products);
  }, [totalCar]);

  return (
    <CardProduct>
      <div className="card-product--img">
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
      </div>
      <p
        className="card-product--price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { ` R$: ${Number(price).toFixed(2).replace('.', ',')}` }
      </p>
      <div
        className="footer-card-product"
      >
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <div className="card-product--btns">
          <button
            id={ id }
            className="button-left"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ ({ target }) => changeQuantity('decrease', target.id) }
          >
            -
          </button>
          <input
            id={ id }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="number"
            value={ quantity }
            onChange={ ({ target }) => changeQuantity('set', target.id, target.value) }
          />
          <button
            id={ id }
            className="button-right"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ ({ target }) => changeQuantity('increase', target.id) }
          >
            +
          </button>
        </div>
      </div>
    </CardProduct>
  );
}

ProductContainer.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductContainer;
