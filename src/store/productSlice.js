import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { any } from 'ramda';

const initialState = {
  list: [],
  rawList: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    chooseProduct(state, { payload: product }) {
      if (any(({ id }) => id === product.id, state.list)) {
        state.list = state.list.filter(({ id }) => id !== product.id);
        state.rawList = state.list.filter(({ id }) => id !== product.id);
      } else {
        state.list.push({
          ...product,
          totalKkal: product.kall * product.weight / 100,
        });
        state.rawList.push({
          ...product,
          totalKkal: product.kall * product.weight / 100,
        });
      }
    },
    setProductQuantity(state, { payload: { productId, weight } }) {
      state.list.forEach((product) => {
        if (product.id === productId) {
          product.weight = weight;
          product.totalKkal = product.kall * weight / 100;
        }
      });
    },
    removeProduct(state, { payload: product }) {
      state.list = state.list.filter(({ id }) => id !== product.id);
      state.rawList = state.rawList.filter(({ id }) => id !== product.id);
    }
  },
});

export const {
  chooseProduct,
  setProductQuantity,
  removeProduct,
} = productSlice.actions;

export const useChosenProducts = () => {
  return useSelector((state) => state.products.list);
};

export const useTotalKkalOfChosenProducts = () => {
  return useSelector((state) => state.products.list.reduce((acc, p) => acc + p.totalKkal, 0));
};

export const useChosenRawProducts = () => {
  const rawList = useSelector((state) => state.products.rawList);
  return rawList.reduce((acc, p) => {
    return { ...acc, [p.id]: p };
  }, {});
};

export default productSlice.reducer;
