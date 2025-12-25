
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mainApi } from './api';
import productsReducer from './productSlice.js';

const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
    .concat(mainApi.middleware)

});
