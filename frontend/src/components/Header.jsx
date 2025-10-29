import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/components/Header.css';

const Header = ({ isDark, toggleTheme, isScrolled }) => {
  const navigate = useNavigate();

  return (
    <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">Korastra</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Возможности</a></li>
            <li><a href="#benefits">Преимущества</a></li>
            <li><a href="#pricing">Цены</a></li>
            <li><a href="#blog">Новости</a></li>
          </ul>
          <div className="nav-actions">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button className="btn-secondary" onClick={() => navigate('/auth')}>Войти</button>
            <button className="btn-primary" onClick={() => navigate('/auth')}>Начать бесплатно</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
