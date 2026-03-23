import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Slices/FilterSlice';
import productReducer from './Slices/ProductSlice';
import cartReducer from './Slices/CartSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;