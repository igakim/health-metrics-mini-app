// import cn from 'classnames';

import styles from './ProductQuantity.module.scss';
import {
  removeProduct,
  setProductQuantity,
  useChosenProducts,
  useChosenRawProducts, useTotalKkalOfChosenProducts
} from '../../store/productSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appRoutes } from '../../router.jsx';
import { any } from 'ramda';
import { FiX } from 'react-icons/fi';

const ProductQuantity = () => {
  const chosenProducts = useChosenProducts();
  const chosenRawProducts = useChosenRawProducts();
  const totalKkal = useTotalKkalOfChosenProducts();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const setQuantity = (productId) => (e) => {
    dispatch(setProductQuantity({ productId, weight: e.target.value }));
  };

  const handleSave = () => {
    const dataToSend = chosenProducts.map((p) => ({
      id: p.id,
      weight: p.weight,
    }))
    window.Telegram.WebApp.sendData(dataToSend);
  };

  const handleDeleteProduct = (product) => () => {
    dispatch(removeProduct(product));
  };

  const isAllFilled = !(any(({ weight }) => !weight, chosenProducts));

  const handleChangeStep = (productId, currentWeight, op) => () => {
    const defaultWeight = chosenRawProducts[productId].weight;
    const newWeight = op === 'inc'
      ? Number(currentWeight) + Number(defaultWeight)
      : Number(currentWeight) - Number(defaultWeight)

    if (newWeight < 0) return;

    dispatch(setProductQuantity({ productId, weight: newWeight }));
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Укажите количество</h1>
      <div className={styles.products}>
        {
          chosenProducts.map((product) => (
            <div className={styles.productsItem} key={product.id}>
              <button type="button" className={styles.productsRemove} onClick={handleDeleteProduct(product)}><FiX/>
              </button>
              <div className={styles.productsData}>
                <h3 className={styles.productsTitle}>{product.title}</h3>
                <p className={styles.productsDescription}>
                  <span>{product.description}</span>
                  <span>{product.totalKkal || '200'}</span>
                </p>
              </div>
              <div className={styles.productsInput}>
                <div className={styles.productsInputWrapper}>
                  <input
                    type="number"
                    onChange={setQuantity(product.id)}
                    value={product.weight ?? ''}
                  />
                  <span className={styles.productsMeasure}>{product.value_measure}</span>
                </div>
                <div className={styles.productsInputSteps}>
                  <button type="button" className={styles.productsInputStepsDec} onClick={handleChangeStep(product.id, product.weight, 'dec')}>-</button>
                  <button type="button" className={styles.productsInputStepsInc} onClick={handleChangeStep(product.id, product.weight, 'inc')}>+</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.footerBack} onClick={() => navigate(appRoutes.productList() + `?${queryParams.toString()}`)}>Назад
        </button>
        <button
          type="button"
          className={styles.footerSave}
          onClick={handleSave}
          disabled={!isAllFilled}
        >
          Сохранить - {totalKkal} kkal
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
