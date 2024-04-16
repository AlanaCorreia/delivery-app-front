import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

const signIn = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default signIn;
