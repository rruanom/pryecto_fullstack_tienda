import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../../redux/cart/cartActions";
import ProductEdit from '../Home/ProductsList/ProductCard/ProductEdit/ProductEdit';

const Details = ({ product, onClose, onProductUpdated, onProductDeleted }) => {
  const [provider, setProvider] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const providerRes = await axios.get(`http://localhost:5000/api/providers/${product.id_provider}`);
        setProvider(providerRes.data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchProvider();
  }, [product.id_provider]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/product/${product.id_product}`);
      onProductDeleted(product.id_product);
      alert(`se ha borrado el producto ${product.name}`)
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateSuccess = (updatedProduct) => {
    onProductUpdated(updatedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return <ProductEdit 
      product={product} 
      onUpdateSuccess={handleUpdateSuccess} 
      onCancel={() => setIsEditing(false)} 
    />;
  }

  return (
    <div className="details">
      <h1>{product.name}</h1>
      <p>Price: {product.price}€</p>
      <p>Category: {product.category}</p>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Añadir al carrito</button>
      {isLoggedIn && user?.isAdmin && (
        <>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Borrar</button>
        </>
      )}
      {provider && (
        <>
          <h2>Provider Information</h2>
          <p>Name: {provider.name}</p>
          <p>Address: {provider.address}</p>
          <p>CIF: {provider.cif}</p>
        </>
      )}
    </div>
  );
};

export default Details;