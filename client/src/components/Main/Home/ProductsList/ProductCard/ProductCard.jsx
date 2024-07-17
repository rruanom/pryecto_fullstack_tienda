import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { name, price, id_category, category, image, provider } = product;

  // Clase de tipo principal
  const typeClass = `type-${id_category}`;

  return (
    //<Link to={`/pokemon/${id}`} state={{  }} className="pokemon-link">
    <article className={typeClass}>
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
    //</Link>
  );
}