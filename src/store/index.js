import { configureStore } from '@reduxjs/toolkit';
import totalSum from './reducers/totalSum';

const store = configureStore({
  reducer: {
    totalSum,
  },
});

export default store;
