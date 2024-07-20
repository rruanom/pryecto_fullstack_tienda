import React, { useState, useEffect } from "react";
import axios from 'axios';

const ProductEdit = ({ product, onUpdateSuccess, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndProviders = async () => {
      try {
        const [categoriesRes, providersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/categories'),
          axios.get('http://localhost:5000/api/providers')
        ]);
        setCategories(categoriesRes.data);
        setProviders(providersRes.data);
      } catch (error) {
        console.error("Error fetching categories and providers:", error);
      }
    };

    fetchCategoriesAndProviders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/products/product/${product.id_product}`, {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        image: editedProduct.image,
        category: editedProduct.category,
        provider: editedProduct.provider
      });
      onUpdateSuccess(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={editedProduct.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="price"
        type="number"
        value={editedProduct.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <textarea
        name="description"
        value={editedProduct.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="image"
        value={editedProduct.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <select
        name="category"
        value={editedProduct.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id_category} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="provider"
        value={editedProduct.provider}
        onChange={handleChange}
        required
      >
        <option value="">Select Provider</option>
        {providers.map(provider => (
          <option key={provider.id_provider} value={provider.name}>
            {provider.name}
          </option>
        ))}
      </select>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProductEdit;