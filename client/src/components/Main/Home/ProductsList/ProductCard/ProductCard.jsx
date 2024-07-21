import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../../../../redux/cart/cartActions";

const ProductCard = ({ product, onProductClick }) => {
  const { id_product, name, price, id_category, category, image, provider } = product;
  const dispatch = useDispatch();

  const typeClass = `type-${id_category}`;
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    e.target.blur();
  };

  return (
    <div className='product-card'>
    <article className={typeClass} onClick={() => onProductClick(product)}>
      <header>
        <h2 className='name'>{name}</h2>
      </header>
      <div className='provider'>{provider}</div>
      <figure className='imageProduct'>
        <img src={image} alt={`Image of ${category}`} />
      </figure>
      <footer>
        <div className="price"> <strong>{price}€</strong></div>
        <button onClick={handleAddToCart}>Añadir al carrito</button>
      </footer>
    </article>
    </div>
  );
};

export default ProductCard;