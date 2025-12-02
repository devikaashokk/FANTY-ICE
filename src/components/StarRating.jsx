import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/starRating.css';

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  onRate: PropTypes.func.isRequired,
};

export default StarRating;
