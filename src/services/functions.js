import { TEN } from './constants';
import { api } from './fechApi';

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export default setToken;

export const saveLocalStorage = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
};

export const clearLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('products');
  // localStorage.removeItem('carShop');
};

export const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const getProductsLocalStorage = () => JSON.parse(localStorage.getItem('products'));

export const getCarShopLocalStorage = () => JSON.parse(localStorage.getItem('carShop'));

export const serializeDate = (date) => {
  const formatDate = new Date(date).toLocaleString('pt-BR').slice(0, TEN);

  return formatDate;
};
