import cn from 'classnames';
import styles from './ProductItem.module.scss';
import { BiCheckDouble } from 'react-icons/bi';

const ProductItem = ({
  product,
  isChosen,
  onClick,
}) => {

  return (
    <button
      className={cn({
        [styles.wrapper]: true,
        [styles.wrapperChosen]: isChosen,
      })}
      type="button"
      onClick={() => onClick(product)}
    >
      {
        isChosen && (
          <span className={styles.wrapperChosenIcon}>
            <BiCheckDouble />
          </span>
        )
      }
      <div className={styles.main}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
      </div>
    </button>
  );
};

export default ProductItem;
