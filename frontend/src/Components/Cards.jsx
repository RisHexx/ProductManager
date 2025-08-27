import React from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../Store/useProductStore';

const Cards = ({ product }) => {
  const { deleteProduct } = useProductStore();
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.price}</p>
        <div className="card-actions justify-end gap-2">
          <Link to={`/products/${product.id}`}>
            <button className="btn btn-outline btn-primary">Edit</button>
          </Link>
          <button className="btn btn-outline btn-error" onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Cards