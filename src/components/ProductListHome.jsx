import React from 'react';
import ProductItemHome from './ProductItemHome'; // Import ProductItem for Home Page
import mangoImage from '../assets/mango.jpeg';
import chocoImage from '../assets/choco.jpeg';
import strawberryImage from '../assets/strawberry.jpeg';
import vanillaImage from '../assets/vanilla.jpeg';
import pistachioImage from '../assets/pistachio.jpeg';
import blueberryImage from '../assets/blueberry.jpeg';
import '../styles/productListHome.css';

const products = [
  { id: 1, name: 'Mango Delight', description: 'A tropical treat bursting with real mango flavor.', price: 2, image: mangoImage },
  { id: 2, name: 'Chocolate Fudge', description: 'Rich and creamy chocolate fudge candy.', price: 3, image: chocoImage },
  { id: 3, name: 'Strawberry Swirl', description: 'Sweet and tangy strawberry swirl candy.', price: 2.5, image: strawberryImage },
  { id: 4, name: 'Vanilla Bliss', description: 'Classic and creamy vanilla candy.', price: 2, image: vanillaImage },
  { id: 5, name: 'Pistachio Dream', description: 'Nutty and creamy pistachio candy.', price: 2.5, image: pistachioImage },
  { id: 6, name: 'Blueberry Burst', description: 'Refreshing blueberry flavor in every bite.', price: 2.5, image: blueberryImage },
];

function ProductListHome() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItemHome key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductListHome;
