import React from 'react';

const Card = ({ children, className = '', hover = false, padding = true }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;