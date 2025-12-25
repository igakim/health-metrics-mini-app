import { createBrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductQuantity from './pages/ProductQuantity/index.js';

export const appRoutes = {
  productList: () => '/',
  productQuantity: () => '/quantity',
};

const router = createBrowserRouter([
  {
    path: appRoutes.productList(),
    element: <ProductList />,
    // errorElement: <Error />,
  },
  {
    path: appRoutes.productQuantity(),
    element: <ProductQuantity />,
    // errorElement: <Error />,
  },
]);

export default router;
