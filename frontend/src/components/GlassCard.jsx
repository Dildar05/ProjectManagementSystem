import React from 'react';
import './GlassCard.css';

/**
 * GlassCard - переиспользуемая карточка с Glassmorphism эффектом
 * 
 * @param {ReactNode} children - содержимое карточки
 * @param {string} className - дополнительные классы
 * @param {boolean} hover - включить hover эффект
 * @param {string} padding - размер padding: 'sm', 'md', 'lg'
 * @param {function} onClick - обработчик клика
 */
const GlassCard = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  onClick 
}) => {
  const paddingSizes = {
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px'
  };

  return (
    <div 
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{ padding: paddingSizes[padding] }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
