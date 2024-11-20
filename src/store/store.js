import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './slices/invoicesSlice';
import productsReducer from './slices/productsSlice';
import customersReducer from './slices/customersSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
    error: errorReducer,
  },
});
