import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ProductContainer from '../components/ProductContainer';
import setToken, { clearLocalStorage, getProductsLocalStorage,
  getUserLocalStorage } from '../services/functions';
import { api } from '../services/fechApi';
import ContainerProducts from '../styles/Products';

function ProductsCustomer() {
  const navigate = useNavigate();

  const dataTotalSum = useSelector(({ totalSum }) => totalSum);

  const [products, setProducts] = useState([]);

  const handleCarShop = () => {
    const productsLocalStorage = getProductsLocalStorage();

    const productsWithQuant = productsLocalStorage
      .filter(({ quantity }) => quantity !== 0);

    localStorage.setItem('carShop', JSON.stringify(productsWithQuant));

    navigate('/customer/checkout');
  };

  useEffect(() => {
    const { token } = getUserLocalStorage();

    if (!token) return navigate('/');

    setToken(token);

    const getProducts = async () => {
      try {
        const { data } = await api.get('/product');

        if (!localStorage.getItem('products')) {
          const arrayProduct = data.map((item) => {
            const { id, price, name } = item;

            return {
              id,
              name,
              price,
              quantity: 0,
            };
          });
          localStorage.setItem('products', JSON.stringify(arrayProduct));
        }
        return setProducts(data);
      } catch (error) {
        clearLocalStorage();

        return navigate('/');
      }
    };

    getProducts();
  }, [navigate]);

  return (
    <div>
      <Navbar item1="PRODUTOS" item2="MEUS PEDIDOS" />
      <ContainerProducts>
        { products?.map((product) => (
          <ProductContainer key={ product.id } product={ product } />
        ))}
        <button
          className="btn-car-shop"
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ handleCarShop }
          disabled={ ((dataTotalSum === '0,00' || dataTotalSum === 0)) }
        >
          Ver Carrinho: R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {dataTotalSum.toFixed(2).replace('.', ',')}
          </span>
        </button>
      </ContainerProducts>
    </div>
  );
}

export default ProductsCustomer;
