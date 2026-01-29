// import cn from 'classnames';

import styles from './ProductList.module.scss';
import { useGetProductsQuery } from '../../store/api.js';
import ProductItem from '../../components/ProductItem/index.js';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { BarLoader } from 'react-spinners';
import scssVars from '../../styles/params.module.scss';
import { useDispatch } from 'react-redux';
import { chooseProduct, useChosenProducts } from '../../store/productSlice.js';
import { any } from 'ramda';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appRoutes } from '../../router.jsx';

const ProductList = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const chosenProducts = useChosenProducts();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const {
    data: productData,
    isFetching: isProductDataFetching,
  } = useGetProductsQuery({ q: debouncedSearchValue, ...Object.fromEntries(queryParams.entries()) });

  const handleChooseProduct = (product) => {
    dispatch(chooseProduct(product));
  };

  return (
    <div className="container">
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
          placeholder="Начни искать..."
        />
      </div>
      {
        <div className={styles.loading}>
          {isProductDataFetching && (
            <BarLoader width="100%" color={scssVars.primary}/>
          )}
        </div>
      }
      <div className={styles.products}>
        {productData?.results.map((product) => (
          <ProductItem
            key={product.id}
            isChosen={any(({ id }) => id === product.id, chosenProducts)}
            product={product}
            onClick={handleChooseProduct}
          />
        ))}
      </div>

      {
        chosenProducts.length === 0
          ? null
          : (
            <button type="button" className={styles.footer} onClick={() => navigate(appRoutes.productQuantity() + `?${queryParams.toString()}`)}>
              Вы выбрали продукты:
              {' '}
              {
                chosenProducts.length > 2
                  ? [chosenProducts[0], chosenProducts[1], { title: `и еще ${chosenProducts.length - 2}` }]
                    .map(({ title }) => title).join(', ')
                  : chosenProducts.map(({ title }) => title).join(', ')
              }
              <div className={styles.next}>
                Продолжить
              </div>
            </button>
          )
      }
    </div>
  );
};

export default ProductList;
