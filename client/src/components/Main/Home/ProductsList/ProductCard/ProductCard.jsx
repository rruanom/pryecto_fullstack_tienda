import React from 'react';

export default function ProductCard({ product, onProductClick }) {
  const { id_product, name, price, id_category, category, image, provider } = product;

  const typeClass = `type-${id_category}`;
  
  return (
    <article className={typeClass} onClick={() => onProductClick(product)}>
      <header>
        <h2 className='name'>{name}</h2>
      </header>
      <div className="price">Precio: {price}€</div>
      <figure>
        <img src={image} alt={`Image of ${category}`} />
        <figcaption className='category'>{category}</figcaption>
      </figure>
      <footer>
        <div className='provider'>Proveedor: {provider}</div>
      </footer>
    </article>
  );
}