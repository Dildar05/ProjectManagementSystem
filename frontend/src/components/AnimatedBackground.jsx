import React from 'react';
import './AnimatedBackground.css';

/**
 * AnimatedBackground - компонент для создания жидкого фона с Liquid Glass эффектом
 * 
 * @param {string} variant - вариант фона: 'default', 'hero', 'minimal'
 * @param {number} shapesCount - количество liquid shapes (1-5)
 */
const AnimatedBackground = ({ variant = 'default', shapesCount = 3 }) => {
  const renderShapes = () => {
    const shapes = [];
    const maxShapes = Math.min(shapesCount, 5);
    
    for (let i = 1; i <= maxShapes; i++) {
      shapes.push(
        <div 
          key={i} 
          className={`liquid-shape shape-${i} variant-${variant}`}
        ></div>
      );
    }
    
    return shapes;
  };

  return (
    <div className="liquid-shapes-container">
      {renderShapes()}
    </div>
  );
};

export default AnimatedBackground;
