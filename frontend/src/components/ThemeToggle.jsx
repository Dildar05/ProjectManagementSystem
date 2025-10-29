import React from 'react';
import '../styles/components/ThemeToggle.css';

/**
 * ThemeToggle - переключатель темной/светлой темы
 */
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="toggle-icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
