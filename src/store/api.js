import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const API_HOST = 'https://ksinn.igorkim.uz';

const routes = {
  products: () => '/api/webapp/nutrition/foods',
}

export const mainApi = createApi({
  reducerPath: 'main',
  baseQuery: baseQuery({ baseUrl: API_HOST }),
  tagTypes: [],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: routes.products(),
        params,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
} = mainApi;
