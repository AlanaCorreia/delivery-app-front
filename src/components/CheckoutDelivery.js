import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/fechApi';
import { getCarShopLocalStorage } from '../services/functions';
import { DeliveryContainer, DeliveryForm, TitleDelivery, FinishButton,
  DeliveryInput, DeliverySelect, DeliveryLabel,
  InputsContainer } from '../styles/CheckoutForm';

function CheckoutDelivery() {
  const navigate = useNavigate();
  const totalPrice = useSelector(({ totalSum }) => totalSum);

  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const handleSubmit = async () => {
    try {
      const carShopLocalStorage = getCarShopLocalStorage();

      const saleProducts = carShopLocalStorage.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));

      const objectRequest = {
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        sellerId: Number(sellerId),
        saleProducts,
      };

      const { data } = await api.post('/sale', objectRequest);

      navigate(`/customer/orders/${data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.get('/user/seller');
      setSellers(data);
    };

    getUsers();
  }, []);

  return (
    <DeliveryContainer>
      <TitleDelivery>Detalhes e Endereço para entrega</TitleDelivery>
      <DeliveryForm>
        <InputsContainer>
          <DeliveryLabel htmlFor="seller-input">
            P. Vendedora Responsável
            <DeliverySelect
              data-testid="customer_checkout__select-seller"
              value={ sellerId }
              onChange={ ({ target: { value } }) => setSellerId(value) }
            >
              {sellers.map(({ id, name: sellerName }) => (
                <option key={ id } value={ id }>
                  { sellerName }
                </option>
              ))}
            </DeliverySelect>
          </DeliveryLabel>

          <DeliveryLabel htmlFor="address-input">
            Endereço
            <DeliveryInput
              address
              data-testid="customer_checkout__input-address"
              type="text"
              value={ deliveryAddress }
              onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            />
          </DeliveryLabel>

          <DeliveryLabel htmlFor="deliveryNumber-input">
            Número
            <DeliveryInput
              data-testid="customer_checkout__input-addressNumber"
              type="text"
              value={ deliveryNumber }
              onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
              placeholder="198"
            />
          </DeliveryLabel>
        </InputsContainer>

        <FinishButton
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ handleSubmit }
        >
          FINALIZAR PEDIDO
        </FinishButton>
      </DeliveryForm>
    </DeliveryContainer>
  );
}

export default CheckoutDelivery;
