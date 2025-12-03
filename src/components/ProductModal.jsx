import React from "react";
import '../styles/ProductModal.css';
export default function ProductModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <img src={product.image} alt={product.name} className="modal-image" />

        <h2>{product.name}</h2>
        <p className="modal-description">{product.description}</p>
        <p className="modal-price">${product.price.toFixed(2)}</p>

        <button className="modal-add-btn">Add to Cart</button>
      </div>
    </div>
  );
}
