import React, { useState } from 'react';
import ProductItemShop from './ProductItemShop';
import mangoImage from '../assets/mango1.jpeg';
import strawberryImage from '../assets/strawberry1.jpeg';
import blueberryImage from '../assets/blueberry.jpeg';
import pineappleImage from '../assets/pineapple.jpeg';
import mixedFruitImage from '../assets/mixedfruit.jpeg';
import watermelonImage from '../assets/watermelon.jpeg';
import appleImage from '../assets/apple.jpeg';
import orangeImage from '../assets/orange.jpeg';
import lemonImage from '../assets/lemon.jpeg';
import peachImage from '../assets/peach.jpeg';
import cherryImage from '../assets/cherry.jpeg';
import kiwiImage from '../assets/kiwi.jpeg';

// Sample product data with image links
const products = [
  { id: 1, name: 'Mango Ice Candy', description: 'Delicious mango ice treat', price: 5.99, image: mangoImage },
  { id: 2, name: 'Strawberry Ice Candy', description: 'Sweet and tangy strawberry delight', price: 4.99, image: strawberryImage },
  { id: 3, name: 'Blueberry Ice Candy', description: 'Refreshing blueberry flavor', price: 6.49, image: blueberryImage },
  { id: 4, name: 'Pineapple Ice Candy', description: 'Tropical pineapple goodness', price: 5.49, image: pineappleImage },
  { id: 5, name: 'Mixed Fruit Ice Candy', description: 'A blend of various fruits', price: 7.99, image: mixedFruitImage },
  { id: 6, name: 'Watermelon Ice Candy', description: 'Cool watermelon flavor', price: 4.49, image: watermelonImage },
  { id: 7, name: 'Apple Ice Candy', description: 'Refreshing apple flavor', price: 5.29, image: appleImage },
  { id: 8, name: 'Orange Ice Candy', description: 'Tangy and sweet orange flavor', price: 5.79, image: orangeImage },
  { id: 9, name: 'Lemon Ice Candy', description: 'Zesty lemon ice candy', price: 4.99, image: lemonImage },
  { id: 10, name: 'Peach Ice Candy', description: 'Sweet and smooth peach flavor', price: 6.29, image: peachImage },
  { id: 11, name: 'Cherry Ice Candy', description: 'Tart and sweet cherry flavor', price: 5.89, image: cherryImage },
  { id: 12, name: 'Kiwi Ice Candy', description: 'Exotic kiwi flavor with a twist', price: 6.59, image: kiwiImage },
];

function ProductListShop() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id}>
          <ProductItemShop product={product} />
          <button onClick={() => handleViewDetails(product)}>View Details</button>
        </div>
      ))}

      {/* Modal */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListShop;
